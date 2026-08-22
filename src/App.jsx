import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import RightClickGuard from './components/RightClickGuard';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <>
      <SmoothScroll />
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
