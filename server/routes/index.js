import express from "express";
import authRoutes from "./authRoutes.js";
import showRoutes from "./showRoutes.js";
import bookingRoutes from "./bookingRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/show", showRoutes);
router.use("/booking", bookingRoutes);

export default router;
