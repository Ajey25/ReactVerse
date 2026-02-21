import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import passport from "passport";
import "./config/passport.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  }),
);

app.use(passport.initialize());

// Connect MongoDB - with connection caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  try {
    cachedDb = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    return cachedDb;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// Call this in routes that need DB
app.use(async (req, res, next) => {
  // Skip database for static files and test route
  if (req.path === "/test" || req.path.startsWith("/assets/")) {
    return next();
  }

  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
import authRoutes from "./routes/authroutes.js";
import lessonRoutes from "./routes/lessonroutes.js";
import progressRoutes from "./routes/progressroutes.js";
import interviewRoutes from "./routes/interviewroutes.js";
import interviewProgressRoutes from "./routes/interviewProgressRoutes.js";
import aptiRoutes from "./routes/aptiRoutes.js";
import aptiProgressRoutes from "./routes/aptiProgrssRoutes.js";
import questionRoutes from "./routes/codingQuestionsRoutes.js";
import codingProgressRoutes from "./routes/codingProgressRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

app.get("/test", (req, res) => {
  res.send("Server is alive");
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

// 🔴 IMPORTANT: Serve static files in production
if (process.env.NODE_ENV === "production") {
  // In Vercel, the dist folder will be at the root level
  const distPath = path.join(process.cwd(), "dist");
  console.log("Serving static files from:", distPath);

  // Serve static assets
  app.use(express.static(distPath));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    // Skip API and auth routes
    if (!req.path.startsWith("/api") && !req.path.startsWith("/auth")) {
      res.sendFile(path.join(distPath, "index.html"));
    }
  });
} else {
  // Development mode - you might still want to serve from REACTVERSE/dist
  const devDistPath = path.join(__dirname, "../REACTVERSE/dist");
  app.use(express.static(devDistPath));

  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api") && !req.path.startsWith("/auth")) {
      res.sendFile(path.join(devDistPath, "index.html"));
    }
  });
}

export default app;
