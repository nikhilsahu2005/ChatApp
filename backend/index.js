import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./SocketIO/server.js";

import userRoutes from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5174";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 4005;

if (!process.env.MONGODB_URI || !process.env.JWT_TOKEN) {
  console.error("Missing MONGODB_URI or JWT_TOKEN in backend/.env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
