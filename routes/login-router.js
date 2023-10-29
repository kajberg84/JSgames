import express from 'express'

export const loginRouter = express.Router()

//localhost:8080/login
loginRouter.get('/', (req, res, next) => {
    res.send("Loginrouter WORK")
})

loginRouter.post('/', (req, res, next) => {
    res.send("post works, login")
})