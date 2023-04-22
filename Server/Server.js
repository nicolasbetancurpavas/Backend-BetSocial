import { middlewares } from './Middlewares/Middlewares.js'
import { connectionDb } from './DataBase/connectionDb.js'
import { authRoutes } from './Routes/authRoutes.js'
import { usersRoutes } from './Routes/usersRoutes.js'
import { postRoutes } from './Routes/postRoutes.js'
import express from 'express'

export class Server {
    constructor() {
        this.app = express()
        middlewares(this.app)
        this.dataBase()
        this.authRequests()
    }

    wakeServer() {
        const PORT = process.env.PORT || 3000
        this.app.listen(PORT, () => {
            console.log("SERVER ON " + PORT)
        })
    }

    dataBase = () => connectionDb()

    authRequests = () => this.app.use('/auth', authRoutes)
    usersRequets = () => this.app.use('/user', usersRoutes)
    postRequets = () => this.app.use('/post', postRoutes)
}
