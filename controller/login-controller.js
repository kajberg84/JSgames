import createError from 'http-errors'
import { checkUserPassword } from '../utilities/passwordCheck.js'
import UserModel from "../models/user-model.js"


export class LoginController {
    async login(req, res, next) {
        console.log(req.query.email, ' is trying to login')
        try {
            // måste fixa jwt// annat?
            // kör en get mot mongodb o kolla om användaren finns o ta med lösen
            const user = await UserModel.findOne({ email: req.query.email })
            console.log(user)
            const userPasswordHashed = user.password
            const checkPassword = await checkUserPassword(
                req.query.password,
                userPasswordHashed
            )
            // kolla mot användarens lösenord.
            //  if (!user || !checkPassword)
            if (!user || !checkPassword) {
                throw new Error("Wrong Username or Password")
            }
            res.status(200).json({
                access_token: "accessToken"
            });
        } catch (error) {
            console.log("error i login");
            next(createError(403, error));
        }
    }
}