import createError from "http-errors";

export const hasPermission = (req, res, next, permissionLevel) => {
    req.authUser.permissionLevel >= permissionLevel ? next() : next(createError(403));
};