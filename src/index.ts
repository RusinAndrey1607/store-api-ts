import { User } from './models/user.model';
import { dbConnect } from "./db/db"

const express = require("express")
const { config } = require("dotenv")
config()


const port = process.env.PORT || 8000
const app = express()

const start = async () => {
    try {
        await dbConnect()
        console.log(await User.createTable())
        console.log(await User.create({
            email:"21@gmail.com",
            password:"233424234",
            role:"ADMIN"
        }))
        console.log(await User.findAll())

        app.listen(port, () => {
            console.log("Server working on a port", port)

        })
    } catch (error) {
        console.log(error);

    }
}

start()