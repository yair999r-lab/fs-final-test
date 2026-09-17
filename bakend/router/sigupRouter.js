import bcrypt from "bcrypt";
import exprees from "express";
import jwt from "jsonwebtoken";

import { addNewUser } from "../service/service.js";
import { USERS } from "../app.js";

import dotenv from "dotenv";
import { loadFile } from "../db/fileHendler.js";

dotenv.config();

export const sigupRouter = exprees.Router();



sigupRouter.post("/sigup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const users = await loadFile()
    const exist = users.find((u) => u.email === email);
    if (exist) {
      const err = new Error("user olrady exists");
      err.status = 403;
      throw err;
    }

    const hash = await bcrypt.hash(password, 12);
    const nextId = await addNewUser(username, hash, email);
    const token = jwt.sign({ userId: nextId }, process.env.JSON_WEB_TOKEN, {
      expiresIn: "1h",
    });

  
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(201).json({meassage: "uset sigup sccsfuly", token});
  } catch (error) {
    next(error);
  }
});
