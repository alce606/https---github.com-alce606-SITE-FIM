import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setIsAdminAuthenticated(authService.isAdminAuthenticated());
    setUser(authService.getCurrentUser());
  }, []);

  const loginMutation = useMutation(authService.login, {
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
    },
  });

  const adminLoginMutation = useMutation(authService.loginAdmin, {
    onSuccess: (data) => {
      setIsAdminAuthenticated(true);
      setUser(data.user);
    },
  });

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    isAdminAuthenticated,
    user,
    login: loginMutation.mutate,
    adminLogin: adminLoginMutation.mutate,
    logout,
    isLoading: loginMutation.isLoading || adminLoginMutation.isLoading,
    error: loginMutation.error || adminLoginMutation.error,
  };
};