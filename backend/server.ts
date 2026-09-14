import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import rfqRoutes from "./routes/rfqRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

connectDB();

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/rfqs",
  rfqRoutes
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});