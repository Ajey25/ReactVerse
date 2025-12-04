import express from "express";
import {
  markPageCompleted,
  getUserInterviewXP,
} from "../controllers/interviewProgressController.js";

const router = express.Router();

router.post("/complete-page", markPageCompleted);
router.get("/xp/:userId", getUserInterviewXP);

export default router;
