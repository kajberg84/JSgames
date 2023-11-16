import express from 'express'
import { UserController } from '../controller/user-controller.js'
import { hasPermission } from '../utilities/permissionHandlers.js'
import { authAccessToken } from '../utilities/authTokenHandler.js'
export const userRouter = express.Router()

const controller = new UserController()

const PermissionLevels = Object.freeze({
    CHILD: 1,
    GUEST: 2,
    OWNER: 4,
    ADMIN: 8,
    SUPER_USER: 16,
})

// provide req.user to the route if :id is present in the route path
userRouter.param('id', (req, res, next, id) => controller.loadUser(req, res, next, id))

userRouter.post('/', (req, res, next) => controller.create(req, res, next))
userRouter.get('/', (req, res, next) => controller.getUser(req, res, next))

userRouter.get('/getall',
    authAccessToken,
    (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
    (req, res, next) => controller.getAll(req, res, next))

userRouter.delete('/:id',
    authAccessToken,
    (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
    (req, res, next) => controller.delete(req, res, next)
)

userRouter.get('/:id',
    authAccessToken, (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER), (req, res, next) => controller.getById(req, res, next))

/*
userRouter.put('/',
    authAccessToken,
    (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
    (req, res, next) => controller.update(req, res, next)
) */

// ADMIN get all users.