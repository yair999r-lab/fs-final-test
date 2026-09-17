import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import { USERS } from "../app.js"

import cookieParser from "cookie-parser"
import { loadFile } from "../db/fileHendler.js"

export const profileRouter = express.Router()

profileRouter.use(cookieParser())

profileRouter.post("/profile", async (req, res, next) =>{
    const auto = req.body.Authorization
    const token = auto.split(' ')[1]
    if(!token){
        const error = new Error("token not send")
        error.status = 403
        return next(error)
    }

    try {
        console.log(token)
        const decodet = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        req.user = decodet

        const users = await loadFile()
        const user = users.find(u => u.id === req.user.userId)
        res.status(200).json({meassge: "user accessed", user: user})

    } catch (error) {
        const err = new Error("token not match!!!")
        err.status = 403
        next(err)
    }
})