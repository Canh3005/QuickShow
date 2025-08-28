import { apiClient } from './client.js';
import { API_ENDPOINTS } from '../utils/constants.js';

export const authApi = {
  register: (userData) => {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  login: (credentials) => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  getProfile: () => {
    return apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  logout: () => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: (token) => {
    return apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { token });
  },

  loginWithFacebook: () => {
    return apiClient.get(API_ENDPOINTS.AUTH.LOGIN_WITH_FACEBOOK);
  },

  loginWithGoogle: () => {
    return apiClient.get(API_ENDPOINTS.AUTH.LOGIN_WITH_GOOGLE);
  }
};