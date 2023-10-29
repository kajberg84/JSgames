import express from 'express'
import { friends } from '../utilities/users.js'
export const userRouter = express.Router()

//localhost:8080/login
userRouter.get('/', (req, res, next) => {
    res.send("userRouter WORK")
})

userRouter.post('/information', (req, res, next) => {
    console.log(req.query.name)
    const friendObject = friends.find(friend => friend.name === req.query.name)
    console.log(friendObject)
    console.log(`${friendObject.name}'s favorite fruits are ${friendObject.likes.join(', ')}`)
})
