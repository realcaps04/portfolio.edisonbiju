import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LIGHTNING_HUE = 125;

function Lightning({ hue = LIGHTNING_HUE, xOffset = 0, speed = 1, intensity = 1, size = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');
    const uHueLocation = gl.getUniformLocation(program, 'uHue');
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');

    const startTime = performance.now();
    let frameId;

    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameId);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="relative h-full w-full" />;
}

function FeatureItem({ name, value, position }) {
  return (
    <div className={`pointer-events-auto absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
      <div className="relative flex items-center gap-2">
        <div className="relative">
          <div className="h-2 w-2 rounded-full bg-[#4ade80] group-hover:animate-pulse" />
          <div className="absolute -inset-1 rounded-full bg-[#4ade80]/30 opacity-70 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="relative text-white">
          <div className="font-medium transition-colors duration-300 group-hover:text-[#d9fce7]">{name}</div>
          <div className="text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80">{value}</div>
          <div className="absolute -inset-2 -z-10 rounded-lg bg-[#16a34a]/10 opacity-70 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a120a] text-white"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/80" />

        <div className="absolute top-[62%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-b from-[#16a34a]/25 to-[#facc15]/10 blur-3xl" />

        <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 transform">
          <Lightning hue={LIGHTNING_HUE} xOffset={0} speed={1.6} intensity={0.6} size={2} />
        </div>

        <div className="absolute top-[62%] left-1/2 z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[radial-gradient(circle_at_25%_90%,_#166534_15%,_#000000de_70%,_#000000ed_100%)] backdrop-blur-3xl" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-24 bottom-0 z-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 hidden xl:block"
        >
          <motion.div variants={itemVariants}>
            <FeatureItem name="Branding" value="identities" position="left-[5%] top-[24%]" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureItem name="Web Dev" value="builds" position="left-[8%] bottom-[28%]" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureItem name="Design" value="visuals" position="right-[8%] bottom-[28%]" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FeatureItem name="Strategy" value="beyond" position="right-[5%] top-[24%]" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto relative z-30 mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-7 text-center"
        >
          <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
            <motion.h1
              variants={itemVariants}
              className="mx-auto w-full text-center font-['Gropled','Space_Grotesk',sans-serif] text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Adaptive Branding for Your Business
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="mx-auto w-full text-center font-['Gropled','Space_Grotesk',sans-serif] bg-gradient-to-r from-[#f8fdf4] via-[#4ade80] to-[#facc15] bg-clip-text text-xl font-light leading-snug text-transparent sm:text-2xl md:text-3xl lg:text-4xl"
            >
              Web Development &amp; Beyond
            </motion.h2>
          </div>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-xl text-center text-base leading-relaxed text-[#a8c4a8] md:text-lg"
          >
            Crafting bold, timeless identities for brands that want to be impossible to ignore.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex w-full flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-gradient-to-r from-[#16a34a] to-[#4ade80] px-10 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:from-[#15803d] hover:to-[#22c55e]"
            >
              View Projects
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-white/25 bg-white/10 px-10 py-3 text-sm font-medium text-white/95 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15"
            >
              About me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="flex h-[38px] w-6 justify-center rounded-xl border-2 border-white/25 p-[5px]">
          <motion.span
            className="block h-2 w-1 rounded-sm bg-[#4ade80]"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
