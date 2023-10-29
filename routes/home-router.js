import express from 'express'

export const homeRouter = express.Router()

homeRouter.get('/', (req, res, next) => {
    res.send("HomeRouter works")
})