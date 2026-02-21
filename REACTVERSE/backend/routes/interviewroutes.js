// routes/interviewRoutes.js
import express from "express";
import {
  addQuestion,
  getQuestionsByLevel,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/interviewController.js";

const router = express.Router();

// Add new interview question
router.post("/add", addQuestion);

// Get all questions for a specific level
router.get("/level/:level", getQuestionsByLevel);

// Get single question by ID
router.get("/:id", getSingleQuestion);

// Update question
router.put("/:id", updateQuestion);

// Soft delete
router.delete("/:id", deleteQuestion);

export default router;
