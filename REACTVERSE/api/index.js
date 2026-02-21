// Main Vercel serverless function handler
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import connectDB from "./_lib/mongodb.js";
import "../backend/config/passport.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(passport.initialize());

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Import and use routes
import authRoutes from "../backend/routes/authroutes.js";
import lessonRoutes from "../backend/routes/lessonroutes.js";
import progressRoutes from "../backend/routes/progressroutes.js";
import interviewRoutes from "../backend/routes/interviewroutes.js";
import interviewProgressRoutes from "../backend/routes/interviewProgressRoutes.js";
import aptiRoutes from "../backend/routes/aptiRoutes.js";
import aptiProgressRoutes from "../backend/routes/aptiProgrssRoutes.js";
import questionRoutes from "../backend/routes/codingQuestionsRoutes.js";
import codingProgressRoutes from "../backend/routes/codingProgressRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import leaderboardRoutes from "../backend/routes/leaderboardRoutes.js";

app.get("/test", (req, res) => {
  res.json({ message: "Server is alive", timestamp: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview-progress", interviewProgressRoutes);
app.use("/api/apti", aptiRoutes);
app.use("/api/apti-progress", aptiProgressRoutes);
app.use("/api/coding", questionRoutes);
app.use("/api/codingprogress", codingProgressRoutes);
app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Export for Vercel serverless
export default app;
