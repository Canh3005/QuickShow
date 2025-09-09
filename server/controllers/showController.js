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
    const { movieId, showsInput, showPrice } = req.body;
    if (!movieId || !showsInput || !showPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newShows = await showService.addShow({
      movieId,
      showsInput,
      showPrice,
    });
    res
      .status(201)
      .json({ message: "Show added successfully", shows: newShows });
  } catch (error) {
    console.error("Error adding new show:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await showService.getAllShows();
    res.status(200).json(shows);
  } catch (error) {
    console.error("Error fetching all shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    if (!movieId) {
      return res.status(400).json({ error: "Missing movieId parameter" });
    }
    const showDetails = await showService.getShow(movieId);
    res.status(200).json(showDetails);
  } catch (error) {
    console.error("Error fetching show by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const showController = {
  getNowPlayingShows,
  addShow,
  getAllShows,
  getShow,
};

export default showController;
