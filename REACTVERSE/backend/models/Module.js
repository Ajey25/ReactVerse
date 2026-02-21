import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // "Intro to React"
    description: { type: String }, // optional description
    order: { type: Number, default: 0 }, // sorting
  },
  { timestamps: true }
);

export default mongoose.model("Module", moduleSchema);
