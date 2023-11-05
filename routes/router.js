import express from 'express'
import { homeRouter } from "./home-router.js"
import { loginRouter } from './login-router.js'
import { userRouter } from './user-router.js'
import createError from 'http-errors'

export const router = express.Router()

router.use("/", homeRouter)
router.use("/login", loginRouter)
router.use("/user", userRouter)

router.use('*', (req, res, next) => next(createError(404)))