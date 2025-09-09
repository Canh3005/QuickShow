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

const addShow = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging line
    const { movieId, showsInput, showPrice } = req.body;
    if (!movieId || !showsInput || !showPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newShows = await showService.addShow({ movieId, showsInput, showPrice });
    res.status(201).json({ message: "Show added successfully", shows: newShows });
  } catch (error) {
    console.error("Error adding new show:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const showController = {
  getNowPlayingShows,
  addShow,
};

export default showController;
