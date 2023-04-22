import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        required: true,
        type: String,
        min: 2,
        max: 50,
    },
    email: {
        required: true,
        type: String,
        max: 50,
        unique: true
    },
    password: {
        required: true,
        type: String,
        min: 5,
        match: /^[a-zA-Z0-9]*$/,
        validate: {
            validator: function (v) {
                return /\d/.test(v) && /[a-zA-Z]/.test(v);
            },
            message: props => `${props.value} debe contener letras y números`
        },
        select: false
    },
    picturePath: {
        required: true,
        type: String,
        default: ''
    },
    friends: {
        required: true,
        type: []
    },
    location: String,
    impressions: Number,
    viewedProfile: Number,
    occupationn: Number

}, { timestamps: true }, { versionKey: false })

export const User = mongoose.model("User", UserSchema)