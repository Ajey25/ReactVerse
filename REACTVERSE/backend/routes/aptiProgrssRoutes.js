import express from "express";
import { submitAptiTest } from "../controllers/aptiProgressController.js";

const router = express.Router();
router.post("/submit", submitAptiTest);

export default router;
