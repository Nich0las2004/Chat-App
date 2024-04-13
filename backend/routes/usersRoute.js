import express from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

import generateAccessToken from "../utils/jwtUtils.js";

import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/token", (req, res) => {
  const refreshToken = req.cookies.accessToken;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  if (!refreshToken) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken({
      userName: user.userName,
      email: user.email,
      password: user.password,
    });
    res.json({ accessToken });
  });
});

router.post("/auth/register", async (req, res) => {
  try {
    // hashing a password

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    return res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/auth/delete", (req, res) => {
  res.clearCookie("refreshtoken");

  res.sendStatus(204);
});

router.post("/auth/login", async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName });

  if (user == null) {
    return res.send("Username Or Password Is Incorrect");
  }
  try {
    // comparing passwords

    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_TOKEN_SECRET
      );
      res.cookie("refreshtoken", refreshToken, { httpOnly: true });
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("Not Allowed");
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/auth/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (e) {
    console.log(e);
  }
});

router.get("/room", authenticateToken, (req, res) => {
  res.send(req.user);
});

export default router;
