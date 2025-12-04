import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";

export const createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.json({ success: true, module });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const {
      moduleId,
      title,
      topic,
      subtopic,
      content,
      images,
      codeBlocks,
      quiz,
    } = req.body;

    // Validate module
    const moduleExists = await Module.findById(moduleId);
    if (!moduleExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid moduleId — Module not found.",
      });
    }

    // Get next lesson number
    const lastLesson = await Lesson.find({ moduleId })
      .sort({ lessonNumber: -1 })
      .limit(1);

    const nextLesson = lastLesson.length ? lastLesson[0].lessonNumber + 1 : 1;

    // Create new lesson
    const lesson = await Lesson.create({
      moduleId,
      title,
      topic,
      subtopic,
      content,
      images,
      codeBlocks,
      quiz,
      lessonNumber: nextLesson,
    });

    res.json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all modules
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find().sort({ order: 1 });
    res.json({ success: true, modules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get lessons under a module
export const getLessonsByModule = async (req, res) => {
  try {
    const lessons = await Lesson.find({ moduleId: req.params.moduleId }).sort({
      lessonNumber: 1,
    });
    res.json({ success: true, lessons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get single lesson
export const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    const moduleData = await Module.findById(lesson.moduleId);

    res.json({
      success: true,
      lesson,
      moduleOrder: moduleData?.order ?? null,
      moduleName: moduleData?.title ?? null,
      moduleId: lesson.moduleId, // ⭐ You're getting moduleId here too
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET modules along with their lessons
export const getModulesWithLessons = async (req, res) => {
  try {
    // 1. Fetch modules
    const modules = await Module.find().sort({ order: 1 });

    // 2. Fetch lessons grouped by module
    const lessons = await Lesson.find().sort({ lessonNumber: 1 });

    // 3. Merge lessons into modules
    const merged = modules.map((mod) => ({
      moduleId: mod._id,
      moduleName: mod.title,
      order: mod.order,
      lessons: lessons
        .filter((l) => l.moduleId.toString() === mod._id.toString())
        .map((l) => ({
          lessonId: l._id,
          title: l.title,
          lessonNumber: l.lessonNumber,
        })),
    }));

    res.json({ success: true, data: merged });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
