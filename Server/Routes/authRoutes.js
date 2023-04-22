import express from "express"
import { login } from "../Controller/Auth.js"


export const authRoutes = express.Router()
authRoutes.post("/login", login) 