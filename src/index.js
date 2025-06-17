import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ VERY IMPORTANT for POST requests

app.use("/todos", todoRouter);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Default route for health check
app.get("/", (req, res) => {
  res.send("Todo backend is running");
});

export default app;
