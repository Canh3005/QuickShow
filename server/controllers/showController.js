import showService from "../services/showService.js";

const getNowPlayingShows = async (req, res) => {
  try {
    const shows = await showService.getNowPlayingShows();
    res.status(200).json({ shows });
  } catch (error) {
    console.error("Error fetching now playing shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const showController = {
  getNowPlayingShows,
};

export default showController;
