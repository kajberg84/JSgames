import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema({
    firstname: {
        type: String, required: true, trim: true, maxLength: 1000,
    },
    lastname: {
        type: String, required: true, trim: true, maxLength: 1000,
    },
    address: {
        type: String, required: true, trim: true, maxLength: 1000,
    },
    city: {
        type: String, required: true, trim: true, maxLength: 50,
    },
    zipcode: {
        type: Number, required: true, trim: true, maxLength: 100,
    },
    phone: {
        type: Number, required: true, trim: true, maxLength: 50,
    },
    ingamename: {
        type: String, required: true, trim: true, maxLength: [20, 'password to short'], unique: true,
    },
    email: {
        type: String, required: true, trim: true, maxlength: 100, unique: true,
        validator: validator.isEmail,
        message: "Not a valid email",
        isAsync: false
    },
    password: { type: String, required: true, trim: true, maxlength: 1000, minlength: [5, 'password to short'], },
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
