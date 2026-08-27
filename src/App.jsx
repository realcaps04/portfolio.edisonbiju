import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BuildsPage from './pages/BuildsPage';
import PricingPage from './pages/PricingPage';
import FreePage from './pages/FreePage';
import SupportPage from './pages/SupportPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import RequireAdminAuth from './components/RequireAdminAuth';
import RightClickGuard from './components/RightClickGuard';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import { PwaProvider } from './components/PwaPrompts';
import { ContactProvider } from './components/ContactModal';
import { WorkProvider } from './components/WorkModal';
import CoffeeButton from './components/CoffeeButton';
import SeoHead from './components/SeoHead';

export default function App() {
  return (
    <PwaProvider>
      <ContactProvider>
        <WorkProvider>
          <SmoothScroll />
          <CustomCursor />
          <RightClickGuard />
          <CoffeeButton />
          <SeoHead />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/free" element={<FreePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              path="/admin/inbox"
              element={
                <RequireAdminAuth>
                  <AdminPage />
                </RequireAdminAuth>
              }
            />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </WorkProvider>
      </ContactProvider>
    </PwaProvider>
  );
}
