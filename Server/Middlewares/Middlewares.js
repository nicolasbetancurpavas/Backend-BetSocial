import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'

export const middlewares = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ limit: "30mb", extended: true }))
    app.use(helmet())
    app.use(cors())
    app.use(morgan("common"))
}
