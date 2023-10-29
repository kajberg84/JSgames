import express from 'express'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './mongoose/mongoose.js'

const main = async () => {

    //Connect to DB
    await connectDB()

    const PORT = process.env.PORT || 8080 // create .env later
    const app = express()

    app.use(logger("dev"))

    app.use((req, res, next) => {
        next()
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use("/", router)

    app.use((err, req, res, next) => {
        err.status = err.status || 500
        res.status(err.status).json({
            status: err.status,
            message: err.message
        })
        console.log("server", err.message)
        return
    })

    app.listen(PORT, () => {
        console.log(`Server running at localhost: ${PORT}`)
    })
}

main()