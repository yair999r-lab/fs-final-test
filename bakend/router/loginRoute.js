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
    const { password, email } = req.body;
    
    const user = await findUserPassword(email);
    if(!user){
        const err = new Error("user not exists")
        err.status = 400
        next(err)
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      const err = new Error("password not match");
      err.status = 402;
      next(err)
    }
    const token = jwt.sign({ userId: user.id }, process.env.JSON_WEB_TOKEN, {
      expiresIn: "1h",
    });


    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.status(200).json({message: "uset login sccsfuly", token});
  } catch (error) {
    next(error);
  }
});
