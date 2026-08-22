import { Routes, Route } from 'react-router-dom';
import MaintenancePage from './pages/MaintenancePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

// Production stays on maintenance until the redesign ships.
const MAINTENANCE_MODE = import.meta.env.PROD;

export default function App() {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
}
