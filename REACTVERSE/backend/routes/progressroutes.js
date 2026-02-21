import express from "express";
import {
  markLessonComplete,
  getUserCompletedLessons,
  getUserStats,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/complete", markLessonComplete);
router.get("/completed/:userId", getUserCompletedLessons);
router.get("/stats/:userId", getUserStats);

export default router;
