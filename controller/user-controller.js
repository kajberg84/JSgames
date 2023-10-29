import createError from "http-errors"
import UserModel from "../models/user-model.js"

export function hashThisPassword(password) {
    // FIxa en hashfunction.
    return password
}

export class UserController {
    async create(req, res, next) {
        const { email, password } = req.body
        console.log("-----")
        console.log(req.body)
        console.log(email, password)
        console.log("-----")

        const newUser = new UserModel({
            email: email,
            password: hashThisPassword(password),
            permissionLevel: 4,
            refToken: ""
        })
        // spara till databas
        try {
            await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            console.log("error creating user", error.message)
            next(createError(403, error));
        }
        // error handling
    }
}