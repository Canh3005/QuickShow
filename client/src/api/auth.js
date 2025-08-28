import { apiClient } from './client.js';
import { API_ENDPOINTS } from '../utils/constants.js';
import { openApiWindow } from './window.js';

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
    return openApiWindow(API_ENDPOINTS.AUTH.LOGIN_WITH_FACEBOOK, "_self");
  },

  loginWithGoogle: () => {
    return openApiWindow(API_ENDPOINTS.AUTH.LOGIN_WITH_GOOGLE, "_self");
  }
};