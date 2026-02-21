import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ---------- EXISTING FIELDS (UNCHANGED) ---------- */
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

    /* ---------- NEW PROFILE FIELDS (ADDED ONLY) ---------- */
    profile: {
      phone: {
        type: String,
        default: null,
      },

      gender: {
        type: String,
        enum: ["male", "female", "other", "prefer_not_to_say"],
        default: "prefer_not_to_say",
      },

      college: {
        type: String,
        default: "",
      },

      degree: {
        type: String,
        default: "",
      },

      branch: {
        type: String,
        default: "",
      },

      graduationYear: {
        type: Number,
        default: null,
      },

      country: {
        type: String,
        default: "",
      },

      currentStatus: {
        type: String,
        enum: ["student", "fresher", "working_professional"],
        default: "student",
      },

      skills: {
        type: [String],
        default: [],
      },

      experienceLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
      },

      linkedin: {
        type: String,
        default: "",
      },

      github: {
        type: String,
        default: "",
      },

      portfolio: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        maxlength: 200,
        default: "",
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
