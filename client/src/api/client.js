import { API_BASE_URL } from '../utils/constants.js';
import { storage,ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/storage.js';
import { authApi } from './auth.js';


class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    let token = storage.get(ACCESS_TOKEN_KEY);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let response = await fetch(url, config);
    let data = await response.json();

    // Nếu lỗi 401, thử refresh token
    if (response.status === 401 && storage.get(REFRESH_TOKEN_KEY) && endpoint !== '/login' && endpoint !== '/register') {
      try {
        const refreshRes = await authApi.refreshToken(storage.get(REFRESH_TOKEN_KEY));
        const refreshData = await refreshRes.json();
        if (refreshRes.ok && refreshData.accessToken) {
          storage.set(ACCESS_TOKEN_KEY, refreshData.accessToken);
          // Thử lại request với access token mới
          config.headers.Authorization = `Bearer ${refreshData.accessToken}`;
          response = await fetch(url, config);
          data = await response.json();
        } else {
          throw new Error('Refresh token failed');
        }
      } catch (err) {
        // Nếu refresh thất bại, chuyển về trang login
        window.location.href = '/login';
        throw err;
      }
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

export const apiClient = new ApiClient();