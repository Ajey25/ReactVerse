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
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(passport.initialize());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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

// Serve static files from frontend dist folder
app.use(express.static(path.resolve(__dirname, "dist")));

// Fallback to index.html for SPA routing
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../REACTVERSE/dist/index.html"));
});

app.get("/test", (req, res) => {
  res.send("Server is alive");
});
// Server
export default app;
