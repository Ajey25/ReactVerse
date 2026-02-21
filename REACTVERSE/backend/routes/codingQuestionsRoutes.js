import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/codingQuestionsController.js";

const router = express.Router();

router.post("/", createQuestion); // Create
router.get("/", getAllQuestions); // All questions
router.get("/:id", getQuestionById); // Get single question
router.put("/:id", updateQuestion); // Update
router.delete("/:id", deleteQuestion); // Delete

export default router;
