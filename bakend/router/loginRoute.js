import { USERS } from "../app.js";
import { findUserPassword } from "../service/service.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const loginRouter = express.Router();



loginRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const user = findUserPassword(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err = new Error("password not match");
      err.status = 403;
      next(err);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JSON_WEB_TOKEN, {
      expiresIn: "1h",
    });

    console.log(USERS);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(201).send("uset login sccsfuly");
  } catch (error) {
    next(error);
  }
});
