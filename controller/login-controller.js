import createError from 'http-errors'
import { checkUserPassword } from '../utilities/passwordHandler.js'
import UserModel from "../models/user-model.js"
import { createToken, saveRefToken } from '../utilities/authTokenHandler.js'

export class LoginController {
    async login(req, res, next) {
        try {
            const user = await UserModel.findOne({ email: req.query.email })
            const userPasswordHashed = user.password
            const checkPassword = await checkUserPassword(
                req.query.password,
                userPasswordHashed
            )
            if (!user || !checkPassword) {
                throw new Error("Wrong Username or Password")
            }

            const payload = {
                userId: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                address: user.address,
                city: user.city,
                zipcode: user.zipcode,
                phone: user.zipcode,
                ingamename: user.ingamename,
                email: user.email,
                permissionLevel: user.permissionLevel
            }

            const accessConfig = {
                secret: process.env.ACCESS_TOKEN_SECRET,
                life: process.env.ACCESS_TOKEN_LIFE,
                payload: payload
            }
            const refreshConfig = {
                secret: process.env.REFRESH_TOKEN_SECRET,
                life: process.env.REFRESH_TOKEN_LIFE,
                payload: payload
            };
            const accessToken = createToken(accessConfig)
            const refreshToken = createToken(refreshConfig)
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ3NTY2NTk2NDRiYzczNzY2OGI5ZTYiLCJmaXJzdG5hbWUiOiJLYWoiLCJsYXN0bmFtZSI6IkJlcmciLCJhZGRyZXNzIjoia29zc2F2w6RnZW4gMjEiLCJjaXR5IjoiTm9ycmtvcGluZyIsInppcGNvZGUiOjYxNjMwLCJwaG9uZSI6NjE2MzAsImluZ2FtZW5hbWUiOiJmaW5uZW5rYWoyIiwiZW1haWwiOiJrb3NzYTJAZ21haWwuY29tIiwicGVybWlzc2lvbkxldmVsIjo0LCJpYXQiOjE3MDAxNTY5MjEsImV4cCI6MTcwMDE2MDUyMX0.TFtTi58k27I-wsMpbpsFvnZyJng7y3p2AVWEJdT5Uto"
            // Update refreshtoken and save in db
            await saveRefToken(user._id, refreshToken)

            res.status(200).json({
                access_token: accessToken,
                refresh_token: refreshToken
            });
        } catch (error) {
            console.log("error i login");
            console.log(error)
            next(createError(403, error));
        }
    }
}