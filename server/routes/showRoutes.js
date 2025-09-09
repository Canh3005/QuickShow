import express from "express";
import showController from "../controllers/showController.js";
import auth from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get-now-playing", auth, isAdmin, showController.getNowPlayingShows);
router.post("/add-show", auth, isAdmin, showController.addShow);
router.get("/get-shows", showController.getAllShows);
router.get("/get-show/:movieId", showController.getShow);

export default router;
