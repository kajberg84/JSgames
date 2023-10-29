import createError from 'http-errors'
import { checkUserPassword } from '../utilities/passwordCheck.js'
export class LoginController {
    async login(req, res, next) {
        console.log(req.query.email, ' is trying to login')
        try {
            // måste fixa jwt// annat?
            // kör en get mot mongodb o kolla om användaren finns o ta med lösen
            // const user = await UserModel.findOne( { email: req.query.email} )
            // får tillbaka ett user object
            //const user = req.query.email
            const userPasswordHashed = "kossa2"
            const checkPassword = await checkUserPassword(
                req.query.password,
                userPasswordHashed
            )
            // kolla mot användarens lösenord.
            //  if (!user || !checkPassword)
            if (req.query.email !== "kossa@gmail.com" || !checkPassword) {
                res.status(403).json("Wrong username or password")
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