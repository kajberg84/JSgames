import express from 'express'
import { UserController } from '../controller/user-controller.js'
export const userRouter = express.Router()

const controller = new UserController()

const PermissionLevels = Object.freeze({
    CHILD: 1,
    GUEST: 2,
    OWNER: 4,
    ADMIN: 8
})

// skapa en hasPermission i utils
// skapa en authenticationToken (se vad som används nuförtiden. jwt fortfarande)
// Skapa nedansteånde två routes. med ovanstående funktionalitet

userRouter.get('/', (req, res, next) => controller.getUser(req, res, next))
userRouter.post('/', (req, res, next) => controller.create(req, res, next))

// delete user
// ADMIN get all users.