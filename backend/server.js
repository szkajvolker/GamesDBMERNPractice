import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import gameRoutes from "../backend/routes/game.routes.js";
import testRoute from "../backend/routes/test.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use("/api/games", gameRoutes);
app.use("/api/test", testRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server is running on http://localhost:${PORT} address! `);
});
