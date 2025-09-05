import axios from "axios";

const getNowPlayingShows = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          // eslint-disable-next-line no-undef
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing shows:", error);
    throw error;
  }
};

const showService = {
  getNowPlayingShows,
};
export default showService;
