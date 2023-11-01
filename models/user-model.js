import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
    email: {
        type: String, required: true, maxlength: 100, unique: true, trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Not a valid email",
            isAsync: false
        }
    },
    password: { type: String, required: true, maxlength: 1000, minlength: [5, 'password to short'], trim: true },
    permissionLevel: Number,
    refToken: { type: String },
})

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel

1
2
3
4
5
6
