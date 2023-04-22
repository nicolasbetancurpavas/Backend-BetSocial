import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { Server } from './Server/Server.js'
import { register } from './Server/Controller/Auth.js'
import { createPost } from './Server/Controller/post.js'
import express from 'express'
import * as dotenv from 'dotenv'


dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })
app.post("/auth/register", upload.single("picture"), register)
app.post("/post", upload.single("picture"), createPost)

const serverBetSocial = new Server()
serverBetSocial.wakeServer()
