// controllers/aptiController.js
import AptitudeQuestion from "../models/AptitudeQuestion.js";

// 📌 Add a new aptitude question
export const createAptiQuestion = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.insertMany(req.body);

    res.status(201).json({
      success: true,
      message: "Questions added successfully!",
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📌 Get all questions for a level
export const getAptiQuestionsByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const questions = await AptitudeQuestion.find({
      level,
      isActive: true,
    }).sort({
      pageNo: 1,
      questionNo: 1,
    });

    res.status(200).json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📌 Get questions for a specific page
export const getAptiQuestionsByLevelPage = async (req, res) => {
  try {
    const { level, pageNo } = req.params;

    // 1️⃣ Fetch questions for this page
    const questions = await AptitudeQuestion.find({
      level,
      pageNo,
      isActive: true,
    }).sort({ questionNo: 1 });

    // 2️⃣ Count total questions for this level
    const totalQuestions = await AptitudeQuestion.countDocuments({
      level,
      isActive: true,
    });

    // 3️⃣ Determine total pages (each page is fixed in DB)
    const totalPages = await AptitudeQuestion.distinct("pageNo", {
      level,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      questions,
      count: questions.length,
      page: Number(pageNo),
      totalQuestions,
      totalPages: totalPages.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// OPTIONAL: 📌 Delete a question
export const deleteAptiQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    await AptitudeQuestion.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// OPTIONAL: 📌 Update a question
export const updateAptiQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await AptitudeQuestion.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Question updated successfully.",
      updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
