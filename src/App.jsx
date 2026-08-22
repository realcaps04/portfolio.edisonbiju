import MaintenancePage from './pages/MaintenancePage';

// Flip this to false (and restore the routes below) when the redesign is ready.
const MAINTENANCE_MODE = true;

export default function App() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return null;
}

/*
  Restore this when taking the site out of maintenance:

  import { Routes, Route } from 'react-router-dom';
  import Navbar from './components/Navbar';
  import Hero from './components/Hero';
  import Projects from './components/Projects';
  import Testimonials from './components/Testimonials';
  import Contact from './components/Contact';
  import Footer from './components/Footer';
  import AboutPage from './pages/AboutPage';
  import ProjectsPage from './pages/ProjectsPage';
  import './App.css';

  function HomePage() {
    return (
      <>
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </>
    );
  }

  export default function App() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    );
  }
*/
