import express from "express";
import connectDB from "./config/db.js";

import cors from "cors";

import cookieParser from "cookie-parser";

import { Server } from "socket.io";
import { createServer } from "http";

import usersRoute from "./routes/usersRoute.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (message, room) => {
    io.to(room).emit("receive-message", message);
  });
  socket.on("create-room", (room, cb) => {
    if (!io.sockets.adapter.rooms.has(room)) {
      socket.join(room);
      cb(`Room ${room} created`);
    } else {
      cb(`Room ${room} already exists`);
    }
  });
  socket.on("join-room", (room, cb) => {
    if (io.sockets.adapter.rooms.has(room)) {
      socket.join(room);
      cb(`Joined ${room}`);
    } else {
      cb(`Room ${room} does not exist`);
    }
  });
  socket.on("leave-room", (room, cb) => {
    if (io.sockets.adapter.rooms.has(room)) {
      socket.leave(room);
      cb(`Left ${room}`);
    }else{
      cb(`Cannot leave ${room} as you are not in the room`);
    }
  });
});

// Database connection

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:5173`,
  })
);

app.use(cookieParser());

app.use("/", usersRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});