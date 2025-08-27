import { useState } from 'react';
import { authService } from '../services/authService.js';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const register = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
  };

  const handleTokenRefresh = async () => {
    setLoading(true);
    setError('');
    
    try {
      const newAccessToken = await authService.refreshToken();
      return newAccessToken;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.loginWithFacebook();
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.loginWithGoogle();
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    loginWithFacebook,
    loginWithGoogle,
    handleTokenRefresh,
    loading,
    error,
    isAuthenticated: authService.isAuthenticated(),
    currentUser: authService.getCurrentUser()
  };
};