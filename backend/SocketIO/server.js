import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import express from "express";

dotenv.config();

const app = express();
const server = http.createServer(app);
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5174";

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

io.on("connection", (socket) => {
  console.log("Socket Connected :", socket.id);

  const userId = socket.handshake.query.userId;

  console.log("Connected UserId :", userId);

  if (userId) {
    users[userId] = socket.id;
  }

  console.log("Online Users :", users);

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Socket Disconnected :", socket.id);

    if (userId && users[userId] === socket.id) {
      delete users[userId];
    }

    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
