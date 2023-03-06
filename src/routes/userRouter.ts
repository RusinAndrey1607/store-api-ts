import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userController } from "./../controllers/userController";
import { Router } from "express";

// const userController = require("../controllers/userController")
// const authMiddleware = require("../middlewares/authMiddleware")

export const userRouter = Router();
userRouter.post("/registration", userController.create);
userRouter.post("/login", userController.login);
// @ts-ignore
userRouter.get("/auth", AuthMiddleware, userController.check);

// router.post("/registration",userController.registration)
// router.post("/login",userController.login)
// router.get("/auth", authMiddleware ,userController.check)
