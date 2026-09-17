import bcrypt from "bcrypt";
import exprees from "express";
import jwt from "jsonwebtoken";

import { addNewUser } from "../service/service.js";
import { USERS } from "../app.js";

import dotenv from "dotenv";

dotenv.config();

export const sigupRouter = exprees.Router();



sigupRouter.post("/sigup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const exist = USERS.find((u) => u.email === email);
    if (exist) {
      const err = new Error("user olrady exists");
      err.status = 400;
      throw err;
    }

    const hash = await bcrypt.hash(password, 12);
    const nextId = await addNewUser(username, hash, email);
    console.log(nextId)
    const token = jwt.sign({ userId: nextId }, process.env.JSON_WEB_TOKEN, {
      expiresIn: "1h",
    });

    console.log(USERS);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(201).send("uset sigup sccsfuly");
  } catch (error) {
    next(error);
  }
});
