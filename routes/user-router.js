import express from 'express'
import { UserController } from '../controller/user-controller.js'
export const userRouter = express.Router()

const controller = new UserController()

//localhost:8080/login
userRouter.get('/', (req, res, next) => {
    res.send("userRouter WORK")
})

userRouter.post('/', (req, res, next) => controller.create(req, res, next))
