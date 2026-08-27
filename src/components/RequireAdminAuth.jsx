import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../lib/adminAuth';

export default function RequireAdminAuth({ children }) {
  if (!getAdminToken()) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
