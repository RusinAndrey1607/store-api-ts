import { approuter } from './routes/index';
import { User } from './models/user.model';
import { dbConnect } from "./db/db"

const express = require("express")
const { config } = require("dotenv")
config()


const port = process.env.PORT || 8000
const app = express()
app.use("/api",approuter)

const start = async () => {
    try {
        await dbConnect()
        console.log(await User.findAll())
        app.listen(port, () => {
            console.log("Server working on a port", port)

        })
    } catch (error) {
        console.log(error);

    }
}

start()