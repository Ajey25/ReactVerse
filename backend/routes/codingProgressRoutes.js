import express from "express";
import { addCodingProgress } from "../controllers/codingProgressController.js";

const router = express.Router();

router.post("/", addCodingProgress);

export default router;
