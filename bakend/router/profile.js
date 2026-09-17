import express from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import { USERS } from "../app.js"

import cookieParser from "cookie-parser"

export const profileRouter = express.Router()

profileRouter.use(cookieParser())

profileRouter.get("/profile", (req, res, next) =>{
    const token = req.cookies?.token
    
    if(!token){
        const error = new Error("token not send")
        error.status = 400
        return next(error)
    }

    try {
        const decodet = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        req.user = decodet

        const user = USERS.find(u => u.id === req.user.userId)
        res.status(200).json({meassge: "user accessed", user: user})

    } catch (error) {
        const err = new Error("token not match!!!")
        err.status = 403
        next(err)
    }
})