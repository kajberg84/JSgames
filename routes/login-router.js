import express from 'express'
import { LoginController } from '../controller/login-controller.js'
export const loginRouter = express.Router()

const controller = new LoginController()
//localhost:8080/login
loginRouter.get('/', (req, res, next) => {
    res.send("Loginrouter WORK")
})

loginRouter.post('/', (req, res, next) => controller.login(req, res, next))