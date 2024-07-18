import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const redirectToSignIn = (redirectPath = '/') => {
    navigate('/signin', { state: { from: redirectPath } });
  };

  return { isAuthenticated, redirectToSignIn };
};

export default useAuth;
