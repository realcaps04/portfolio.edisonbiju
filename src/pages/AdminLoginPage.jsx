import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { usePwa } from '../components/pwaContext';
import { getAdminToken, setAdminToken } from '../lib/adminAuth';
import './AdminPage.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { canInstall, standalone, promptInstall } = usePwa();
  const login = useMutation(api.admin.login);
  const seedAdmin = useMutation(api.admin.seed);
  const existingToken = getAdminToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'EB Admin — Sign in';
    document.body.classList.add('is-admin');
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    seedAdmin({}).catch(() => {});
    return () => {
      document.title = previousTitle;
      document.body.classList.remove('is-admin');
      robots.remove();
    };
  }, [seedAdmin]);

  if (existingToken) {
    return <Navigate to="/admin/inbox" replace />;
  }

  const onLogin = async (event) => {
    event.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail || !password) {
      setLoginError('Enter your email and password.');
      return;
    }
    setLoggingIn(true);
    setLoginError('');
    try {
      const result = await login({ email: nextEmail, password });
      setAdminToken(result.token);
      navigate('/admin/inbox', { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not sign in.';
      setLoginError(
        message.replace(/^\[CONVEX.*?\]\s*/, '').replace(/Called by client.*$/i, '').trim() ||
          'Could not sign in.',
      );
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <main className="ad ad--login">
      <form className="ad-login" onSubmit={onLogin} noValidate>
        <p className="ad-kicker">EB Admin</p>
        <h1 className="ad-title font-gropled">
          Sign <span>in</span>
        </h1>
        <p className="ad-copy">Use your admin email and password to open the inbox.</p>
        <label className="ad-label" htmlFor="admin-email">
          Email
          <input
            id="admin-email"
            type="email"
            name="admin-email"
            inputMode="email"
            autoComplete="username"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="ad-label" htmlFor="admin-password">
          Password
          <span className="ad-password">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              name="admin-password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="ad-eye"
              onClick={() => setShowPassword((open) => !open)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </span>
        </label>
        {loginError ? (
          <p className="ad-error" role="alert">
            {loginError}
          </p>
        ) : null}
        <button type="submit" className="ad-btn" disabled={loggingIn}>
          {loggingIn ? 'Signing in…' : 'Sign in'}
        </button>
        {canInstall && !standalone ? (
          <button type="button" className="ad-install" onClick={promptInstall}>
            Install EB Admin
          </button>
        ) : null}
      </form>
    </main>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.8 12s3.4-6.2 9.2-6.2S21.2 12 21.2 12s-3.4 6.2-9.2 6.2S2.8 12 2.8 12Z"
      />
      <circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M9.9 9.9A2.4 2.4 0 0 0 12 14.4M14.1 14.1A2.4 2.4 0 0 1 9.9 9.9M6.6 6.6C4.4 8 2.8 12 2.8 12s3.4 6.2 9.2 6.2c1.7 0 3.2-.4 4.5-1M17.4 17.4c2.2-1.4 3.8-5.4 3.8-5.4s-3.4-6.2-9.2-6.2c-.7 0-1.3.1-1.9.2"
      />
    </svg>
  );
}
