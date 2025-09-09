import express from "express";
import showController from "../controllers/showController.js";
import auth from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get-now-playing", auth, isAdmin, showController.getNowPlayingShows);
router.post("/add-show", auth, isAdmin, showController.addShow);

export default router;
