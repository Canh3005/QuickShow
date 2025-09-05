import express from "express";
import authRoutes from "./authRoutes.js";
import showRoutes from "./showRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/show", showRoutes);

export default router;
