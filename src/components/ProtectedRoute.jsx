// ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextApi } from '../helper/ContextApi';

const ProtectedRoute = ({ children }) => {
  const { isLoading } = useContext(ContextApi);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121215]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B6DF6]"></div>
      </div>
    );
  }

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;