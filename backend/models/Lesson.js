import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    title: { type: String, required: true }, // "What is React?"
    lessonNumber: { type: Number, required: true },

    topic: { type: String }, // "React Introduction"
    subtopic: { type: String }, // "What is React?"

    content: { type: String }, // main text (HTML/Markdown)

    images: [{ type: String }], // URLs or base64

    codeBlocks: [
      {
        language: { type: String, default: "javascript" },
        code: { type: String },
      },
    ],

    quiz: [
      {
        question: String,
        options: [String],
        correctAnswer: Number, // index
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
