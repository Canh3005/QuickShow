import { authApi } from '../api/auth.js';
import { storage, ACCESS_TOKEN_KEY, USER_KEY, REFRESH_TOKEN_KEY } from '../utils/storage.js';

export const authService = {
  async register(userData) {
    try {
      const response = await authApi.register(userData);
      if (response.accessToken) {
        storage.set(ACCESS_TOKEN_KEY, response.accessToken);
        storage.set(USER_KEY, response.user);
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  async login(credentials) {
    try {
      const response = await authApi.login(credentials);
      
      if (response.accessToken) {
        storage.set(ACCESS_TOKEN_KEY, response.accessToken);
        storage.set(REFRESH_TOKEN_KEY, response.refreshToken);
        storage.set(USER_KEY, response.user);
      }
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  async getProfile() {
    try {
      const response = await authApi.getProfile();
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to get profile');
    }
  },

  async refreshToken(token) {
    try {
      const response = await authApi.refreshToken(token);
      if (response.newAccessToken) {
        storage.set(ACCESS_TOKEN_KEY, response.newAccessToken);
      }
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to refresh token');
    }
  },

  loginWithFacebook() {
    return authApi.loginWithFacebook();
  },

  loginWithGoogle() {
    return authApi.loginWithGoogle();
  },

  logout() {
    storage.remove(ACCESS_TOKEN_KEY);
    storage.remove(USER_KEY);
    storage.remove(REFRESH_TOKEN_KEY);
  },

  getCurrentUser() {
    return storage.get(USER_KEY);
  },

  getToken() {
    return storage.get(ACCESS_TOKEN_KEY);
  },

  isAuthenticated() {
    return !!storage.get(ACCESS_TOKEN_KEY);
  }
};