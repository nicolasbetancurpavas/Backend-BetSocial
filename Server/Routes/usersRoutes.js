import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../Controller/users.js";

import { verifyToken } from "../Middlewares/auth.js";

export const usersRoutes = express.Router()

usersRoutes.get("/:id", verifyToken, getUser)
usersRoutes.get("/:id", verifyToken, getUserFriends)

usersRoutes.put("/:id/:friendId", verifyToken, addRemoveFriend)
