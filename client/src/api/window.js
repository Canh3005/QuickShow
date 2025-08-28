export const openApiWindow = async (endpoint, target = '_self') => {
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  window.open(`${apiBaseUrl}${endpoint}`, target);
};