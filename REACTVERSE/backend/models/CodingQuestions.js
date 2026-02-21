import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  id: Number,
  desc: String,
  script: String,
});

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: String,
    description: String,
    requirements: [String],
    hints: String,
    starterCode: String,
    answer: {
      type: String,
    },
    tests: [testSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
