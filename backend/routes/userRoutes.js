import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET profile
router.get("/profile", authMiddleware, getUserProfile);

// UPDATE profile
router.put("/profile", authMiddleware, updateUserProfile);

export default router;
