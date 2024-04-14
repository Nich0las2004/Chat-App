import express from "express";
import connectDB from "./config/db.js";

import cookieParser from "cookie-parser";

import { Server } from "socket.io";
import { createServer } from "http"

import usersRoute from "./routes/usersRoute.js";

const app = express();
const server = createServer(app);
const io = new Server(server)

io.on("connection", socket => {
  console.log("a user connected")
})

// Database connection

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use("/", usersRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
