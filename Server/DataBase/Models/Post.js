import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        min: 5,
        max: 50,
    },

    lastName: {
        type: String,
        min: 5,
        max: 50,
    },

    location: String,
    desription: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    Comment: {
        type: Array,
        default: []
    }
}, { timestamps: true }, { versionKey: false })


export const Post = mongoose.model('Post', postSchema)