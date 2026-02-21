// controllers/interviewController.js
import InterviewQuestion from "../models/InterviewQuestion.js";

// Add a new question
export const addQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.create(req.body);
    res.status(201).json({
      success: true,
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all questions by level
// Get questions by level (with pagination)
export const getQuestionsByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = 10; // fixed 10 questions per page
    const skip = (page - 1) * limit;

    const totalQuestions = await InterviewQuestion.countDocuments({
      level,
      isActive: true,
    });

    const questions = await InterviewQuestion.find({
      level,
      isActive: true,
    })
      .sort({ questionNo: 1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalQuestions / limit);

    res.status(200).json({
      success: true,
      questions,
      page,
      totalPages,
      totalQuestions,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single question
export const getSingleQuestion = async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const updated = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    await InterviewQuestion.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });

    res.status(200).json({
      success: true,
      message: "Question deleted (soft delete)",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
