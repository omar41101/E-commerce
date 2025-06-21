import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // List of public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    // If user is not authenticated and trying to access a protected route
    if (!isAuthenticated && !userInfo && !isPublicRoute) {
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname }
      });
    }
    
    // If user is authenticated and trying to access auth pages, redirect to home
    if (isAuthenticated && userInfo && isPublicRoute) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, userInfo, navigate, location.pathname, isPublicRoute]);

  // Show loading or nothing while checking authentication
  if (!isAuthenticated && !userInfo && !isPublicRoute) {
    return null; // or a loading spinner
  }

  // If user is authenticated and trying to access auth pages, don't render
  if (isAuthenticated && userInfo && isPublicRoute) {
    return null;
  }

  return children;
};

export default AuthGuard; 