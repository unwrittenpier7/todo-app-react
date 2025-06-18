import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// Validate essential environment variables
const REQUIRED_VARS = ["MONGODB_URI"];
REQUIRED_VARS.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
});

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON in request bodies

// Routes
app.use("/todos", todoRouter);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Todo backend is running");
});

// 404 Route
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit if connection fails
  });

export default app;
