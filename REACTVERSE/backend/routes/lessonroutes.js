import express from "express";
import {
  createModule,
  createLesson,
  getModules,
  getLessonsByModule,
  getLesson,
  getModulesWithLessons,
} from "../controllers/lessonController.js";

const router = express.Router();

// modules
router.post("/module", createModule);
router.get("/modules", getModules);

// lessons
router.post("/lesson", createLesson);
router.get("/module/:moduleId/lessons", getLessonsByModule);
router.get("/lesson/:lessonId", getLesson);

// modules with lessons
router.get("/modules-with-lessons", getModulesWithLessons);

export default router;
