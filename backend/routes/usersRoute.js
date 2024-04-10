import express from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

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

router.post("/auth/login", async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName });

  if (user == null) {
    return res.send("Username Or Password Is Incorrect");
  }
  try {
    // comparing passwords

    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken: accessToken });
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

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15s'
  });
}

export default router;
