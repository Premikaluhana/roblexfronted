import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextApi } from '../helper/ContextApi';

const ProtectedAdminRoute = ({ children }) => {
  const { isLoading } = useContext(ContextApi);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121215]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5B6DF6]"></div>
      </div>
    );
  }

  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute; 