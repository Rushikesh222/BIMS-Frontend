import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoutes = ({ redirectTo = '/' }) => {
  const { authData } = useAuth();
  return authData?.isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
