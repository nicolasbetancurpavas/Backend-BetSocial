import { Post } from "../DataBase/Models/Post.js";
import { User } from "../DataBase/Models/User.js";

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comment: [],
        })
        await newPost.save()
        const post = await Post.find({ userId: userId })

        res.status(200).json({
            message: "successful",
            data: {
                user: user,
                post: post
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getPosts = async (req, res) => {
    try {
        const post = await post.find()
        res.status(200).json({
            message: 'successful',
            data: post
        })
    }
    catch (err) {
        res.status(400).json({ messege: err.message })
    }
}

export const getUserPost = async (req, rep) => {
    try {
        const { userId } = req.params
        const userPost = await Post.findById({ userId })
        res.status(200).json({
            message: "request successful",
            data: userPost
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        res.status(201).json({
            message: "sucessful update likes",
            data: updatePost
        })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

