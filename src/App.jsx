import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BuildsPage from './pages/BuildsPage';
import RightClickGuard from './components/RightClickGuard';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import { PwaProvider } from './components/PwaPrompts';
import { ContactProvider } from './components/ContactModal';
import { WorkProvider } from './components/WorkModal';

export default function App() {
  return (
    <PwaProvider>
      <ContactProvider>
        <WorkProvider>
          <SmoothScroll />
          <CustomCursor />
          <RightClickGuard />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/builds" element={<BuildsPage />} />
          </Routes>
        </WorkProvider>
      </ContactProvider>
    </PwaProvider>
  );
}
