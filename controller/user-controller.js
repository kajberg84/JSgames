import createError from "http-errors"
import UserModel from "../models/user-model.js"
import { hashPassword } from "../utilities/passwordHandler.js"

export class UserController {
    // Transforming incoming data
    transformData(user) {
        return {
            id: user._id,
            email: user.email,
            permissionLevel: user.permissionLevel,
            ingamename: user.ingamename,
            refToken: user.refToken
        };
    }
    async loadUser(req, res, next, id) {
        try {
            const user = await UserModel.findOne({ _id: id });
            if (!user) {
                next(createError(404));
                return;
            }
            req.user = user;
            console.log("Load user = req.user: ", req.user)
            next();
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        const { firstname, lastname, address,
            city, zipcode, phone, ingamename, email, password } = req.body

        const newUser = new UserModel({
            firstname: firstname,
            lastname: lastname,
            address: address,
            city: city,
            zipcode: zipcode,
            phone: phone,
            ingamename: ingamename,
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
            if (userExists) {
                return res.status(200).json(this.transformData(userExists))
            } else {
                return res.status(409).json("No user found")
            }
        } catch (error) {
            console.error("Error in database query:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await UserModel.find({});
            res.status(200).json(users);
        } catch (error) {
            error.status = 404;
            error.message = error.message;
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            res.status(200).json(this.transformData(req.user));
        } catch (error) {
            error.status = 404;
            error.message = "No Users to show";
            next(error);
        }
    }

    async delete(req, res, next) {
        const { id } = req.user
        try {
            if (id === req.authUser.userId) {
                await UserModel.deleteOne({ _id: id });
            } else if (req.authUser.permissionLevel === 16) {
                console.log(`Admin ${req.authUser.firstname} ${req.authUser.lastname} deleted user: ${id}`)
                await UserModel.deleteOne({ _id: id });
            } else {
                throw new Error()
            }
            res.status(204).json("User deleted");
        } catch (error) {
            error.status = 404;
            error.message = "Not permitted";
            next(error);
        }
    }

}