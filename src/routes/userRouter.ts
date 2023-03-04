import { Router } from "express"

// const userController = require("../controllers/userController")
// const authMiddleware = require("../middlewares/authMiddleware")

export const userRouter = Router()

userRouter.get("/",(req,res) =>{
    res.send("Hello")
})


// router.post("/registration",userController.registration)
// router.post("/login",userController.login)
// router.get("/auth", authMiddleware ,userController.check)
