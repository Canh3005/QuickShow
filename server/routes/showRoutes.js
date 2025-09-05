import express from "express";
import showController from "../controllers/showController.js";

const router = express.Router();

router.get("/get-now-playing", showController.getNowPlayingShows);

export default router;
