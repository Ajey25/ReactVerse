// routes/aptiRoutes.js
import express from "express";
import {
  createAptiQuestion,
  getAptiQuestionsByLevel,
  getAptiQuestionsByLevelPage,
  deleteAptiQuestion,
  updateAptiQuestion,
} from "../controllers/aptiController.js";

const router = express.Router();

// Admin: Add new question
router.post("/add", createAptiQuestion);

// Get all questions in level
router.get("/level/:level", getAptiQuestionsByLevel);

// Get questions by level + page
router.get("/level/:level/page/:pageNo", getAptiQuestionsByLevelPage);

// Admin: delete question
router.delete("/:id", deleteAptiQuestion);

// Admin: update question
router.put("/:id", updateAptiQuestion);

export default router;
