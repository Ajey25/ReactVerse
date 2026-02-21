import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { calculateTotalXP } from "../controllers/calculateTotalXP.js";

dotenv.config();

const router = express.Router();

/* --------------------------------------------
   GOOGLE LOGIN ROUTES
--------------------------------------------- */

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google Callback URL
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;

      const isFirstTimeGoogleLogin =
        !user.password && user.accountStatus === "google_only";

      const { totalXP } = await calculateTotalXP(user._id);

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          xp: totalXP,
          isFirstTimeGoogleLogin,
        },
        process.env.JWT_SECRET,
      );

      res.redirect(
        `${process.env.CLIENT_URL}/auth/success?token=${token}&firstTimeGoogle=${isFirstTimeGoogleLogin}`,
      );
    } catch (err) {
      console.error("Google callback error:", err);
      res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
    }
  },
);

/* --------------------------------------------
   EMAIL SIGNUP
--------------------------------------------- */

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    let user = await User.findOne({ email });

    // Existing Google user → add password
    if (user && !user.password) {
      user.password = await bcrypt.hash(password, 10);
      user.accountStatus = "google+password";
      user.name = name;
      await user.save();

      const { totalXP } = await calculateTotalXP(user._id);

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          xp: totalXP,
        },
        process.env.JWT_SECRET,
      );

      return res.json({
        message: "Password added. Account upgraded.",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          xp: totalXP,
        },
      });
    }

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // New user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: null,
      googleId: null,
      accountStatus: "password_only",
    });

    const xp = 0;

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        xp,
      },
      process.env.JWT_SECRET,
    );

    res.json({
      message: "Signup successful",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        xp,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* --------------------------------------------
   EMAIL LOGIN
--------------------------------------------- */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(403).json({
        message: "This account uses Google Login",
        requiresGoogle: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { totalXP } = await calculateTotalXP(user._id);

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        xp: totalXP,
      },
      process.env.JWT_SECRET,
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        xp: totalXP,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* --------------------------------------------
   SET PASSWORD FOR GOOGLE USERS
--------------------------------------------- */

router.post("/set-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password) {
      return res.status(400).json({ message: "Password already set" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.accountStatus = "google+password";
    await user.save();

    const { totalXP } = await calculateTotalXP(user._id);

    res.json({
      message: "Password set",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        xp: totalXP,
      },
    });
  } catch (err) {
    console.error("Set password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
