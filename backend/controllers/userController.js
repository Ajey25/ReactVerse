/* ======================================================
   GET USER PROFILE
   ====================================================== */
import User from "../models/User.js";
import { calculateTotalXP } from "./calculateTotalXP.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔥 ALWAYS SYNC XP FIRST
    await calculateTotalXP(userId);

    const user = await User.findById(userId).select("-password -googleId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   UPDATE USER PROFILE (SAFE)
   ====================================================== */

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const allowedUpdates = [
      "name",
      "avatar",
      "profile.phone",
      "profile.gender",
      "profile.college",
      "profile.degree",
      "profile.branch",
      "profile.graduationYear",
      "profile.country",
      "profile.currentStatus",
      "profile.skills",
      "profile.experienceLevel",
      "profile.linkedin",
      "profile.github",
      "profile.portfolio",
      "profile.bio",
    ];

    const updates = {};

    for (const key of allowedUpdates) {
      const keys = key.split(".");
      if (keys.length === 1 && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }

      if (
        keys.length === 2 &&
        req.body[keys[0]] &&
        req.body[keys[0]][keys[1]] !== undefined
      ) {
        updates[key] = req.body[keys[0]][keys[1]];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    // Update profile fields
    await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { runValidators: true },
    );

    // 🔥 RECALCULATE XP AFTER UPDATE
    await calculateTotalXP(userId);

    // Fetch fresh user
    const user = await User.findById(userId).select("-password -googleId");

    res.status(200).json(user);
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      message: error.message,
      errors: error.errors || null,
    });
  }
};
