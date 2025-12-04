import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import passport from "passport";
import "./config/passport.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
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

app.use("/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview-progress", interviewProgressRoutes);
app.use("/api/apti", aptiRoutes);
app.use("/api/apti-progress", aptiProgressRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
