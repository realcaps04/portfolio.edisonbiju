import { Routes, Route } from 'react-router-dom';
import MaintenancePage from './pages/MaintenancePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import RightClickGuard from './components/RightClickGuard';
import CustomCursor from './components/CustomCursor';

// Production stays on maintenance until the redesign ships.
const MAINTENANCE_MODE = import.meta.env.PROD;

export default function App() {
  if (MAINTENANCE_MODE) {
    return (
      <>
        <CustomCursor />
        <RightClickGuard />
        <MaintenancePage />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <RightClickGuard />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </>
  );
}
