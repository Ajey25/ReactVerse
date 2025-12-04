import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },

    password: { type: String, default: null }, // for email login

    googleId: { type: String, default: null },

    avatar: { type: String, default: null },
    xp: {
      type: Number,
      default: 0,
    },
    totalXP: {
      type: Number,
      default: 0,
    },
    accountStatus: {
      type: String,
      enum: ["password_only", "google_only", "google+password"],
      default: "password_only",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
