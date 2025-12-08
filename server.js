import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tournamentRoutes from "./routes/tournamentRoutes.js";

dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Tournament API is running");
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/tournaments", tournamentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
});
