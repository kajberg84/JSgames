import jwt from 'jsonwebtoken'
//import { jwtDecode } from 'jwt-decode';
import UserModel from '../models/user-model.js';
import createError from "http-errors";

export const authAccessToken = async (req, res, next) => {
    const authorization = req.headers.authorization?.split(" ");
    if (authorization?.[0] !== "Bearer") {
        console.log("No Bearer token available");
        next(createError(401, "No bearer token"));
        return;
    }
    try {
        const accessTokenResult = jwt.verify(
            authorization[1],
            process.env.ACCESS_TOKEN_SECRET
        );
        req.authUser = accessTokenResult
        console.log("---authuser----")
        console.log(req.authUser)
        console.log("---authuser----")

        return next()
    } catch (error) {
        console.log("ERROR: inne i authAccessToken")
    }
    return next()
}

export const createToken = (tokenConfig) => {
    console.log(tokenConfig)
    const { secret, life, payload } = tokenConfig;
    // Creating accessToken
    const Token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: life,
    });
    return Token;
};

export const saveRefToken = async (userId, refreshToken) => {
    const filter = { _id: userId }
    const update = { refToken: refreshToken }
    const options = { new: true, upsert: true }
    try {
        await UserModel.findOneAndUpdate(filter, update, options);
        return
    } catch (error) {
        console.log('i autreftoken', userId)
        throw createError(403);
    }
};