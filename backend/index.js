import express from "express";
import connectDB from "./config/db.js";

import { Server } from "socket.io";
import { createServer } from "http"

import usersRoute from "./routes/usersRoute.js";

const app = express();

// Database connection

connectDB();

app.use(express.json());

app.use("/", usersRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
