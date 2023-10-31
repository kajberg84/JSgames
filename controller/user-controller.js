import createError from "http-errors"
import UserModel from "../models/user-model.js"
import { hashPassword } from "../utilities/passwordHandler.js"

export class UserController {
    async create(req, res, next) {
        const { email, password } = req.body

        const newUser = new UserModel({
            email: email,
            password: hashPassword(password),
            permissionLevel: 4,
            refToken: ""
        })

        try {
            await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            console.log("error creating user", error.message)
            next(createError(403, error));
        }
    }

    async getUser(req, res, next) {
        try {
            const userExists = await UserModel.findOne({ email: req.query.email })
            console.log(userExists)
            if (userExists) {
                return res.status(204).json("User exists")
            }
            res.status(409).json("User dont exist")
        } catch (error) {

        }
    }
}