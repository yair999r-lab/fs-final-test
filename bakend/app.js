import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {sigupRouter} from "./router/sigupRouter.js"
import {loginRouter} from "./router/loginRoute.js"
import { profileRouter } from "./router/profile.js"
import cookieParser from "cookie-parser"



export const USERS = [{
    username: 'a',
    password: '$2b$12$G422JQ4oEgf86Ob547T93uXpUj7wWJldML2X1XrqGVak4o0QDAI0.',
    email: 'bbb',
    id: 1
  }]

dotenv.config()

const PORT = process.env.PORT

const server = express()

server.use(cookieParser())
server.use(express.json())
server.use(cors({credentials: "includes" ,origin: "http://localhost:5173"}))


server.use(sigupRouter)
server.use(loginRouter)
server.use(profileRouter)

server.use((err, _req, res, _next) => {
    res.status(err.status || 500)
    const message = err.message || "ISE"

    res.send(message)
})


server.listen(PORT, () => {console.log(`run on port ${PORT}`)})