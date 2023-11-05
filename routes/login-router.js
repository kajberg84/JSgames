import express from 'express'
import { LoginController } from '../controller/login-controller.js'
export const loginRouter = express.Router()

const controller = new LoginController()

loginRouter.post('/', (req, res, next) => controller.login(req, res, next))