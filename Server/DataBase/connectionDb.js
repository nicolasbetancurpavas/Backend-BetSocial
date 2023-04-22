import mongoose from "mongoose";
import { User } from "./Models/User.js";
import { Post } from "./Models/Post.js";
import { users, posts } from "../data/index.js";

export const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connetion MongoDB successful")
    } catch (error) {
        console.log(error)
    }
}
