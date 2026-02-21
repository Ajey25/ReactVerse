import Question from "../models/CodingQuestions.js";

// POST → create new question
export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET → all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET → one question by questionId
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findOne({
      questionId: req.params.id,
    });

    if (!question) return res.status(404).json({ message: "Not found" });

    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT → update question
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findOneAndUpdate(
      { questionId: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE → delete question
export const deleteQuestion = async (req, res) => {
  try {
    await Question.findOneAndDelete({ questionId: req.params.id });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
