import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, required: true },
  completed: { type: Boolean, default: true },
  xp: { type: Number, default: 10 },
  completedAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserProgress", userProgressSchema);
