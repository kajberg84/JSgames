import express from 'express'
import { UserController } from '../controller/user-controller.js'
export const userRouter = express.Router()

const controller = new UserController()

const PermissionLevels = Object.freeze({
    CHILD: 1,
    GUEST: 2,
    OWNER: 4,
    ADMIN: 8,
    SUPER_USER: 16,
})

// skapa en hasPermission i utils // skapa en authenticationToken (se vad som används nuförtiden. jwt fortfarande)
// Skapa nedansteånde två routes. med ovanstående funktionalitet

userRouter.post('/', (req, res, next) => controller.create(req, res, next))
userRouter.get('/', (req, res, next) => controller.getUser(req, res, next))
// update user
// delete user permissionCheck   samma användare
// ADMIN get all users.