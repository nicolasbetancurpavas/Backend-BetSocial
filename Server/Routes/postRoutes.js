import express from "express";

import { verifyToken } from "../Middlewares/auth.js";
import { getPosts, getUserPost, likePost } from "../Controller/post.js";

export const postRoutes = express.Router()

postRoutes.get('/post', verifyToken, getPosts)
postRoutes.get('/:userId/post', verifyToken, getUserPost)

postRoutes.patch("/:id/like", verifyToken, likePost)

