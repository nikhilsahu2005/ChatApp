import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./SocketIO/server.js";

import userRoutes from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 4005;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));