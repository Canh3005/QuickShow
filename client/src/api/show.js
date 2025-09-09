import { apiClient } from "./client.js";
import { API_ENDPOINTS } from "../utils/constants.js";

export const showApi = {
  getNowPlaying: async () => {
    const response = await apiClient.get(API_ENDPOINTS.SHOW.NOW_PLAYING);
    return response.shows;
  },
  addShow: async (showData) => {
    const response = await apiClient.post(API_ENDPOINTS.SHOW.ADD, showData);
    return response;
  }
};
