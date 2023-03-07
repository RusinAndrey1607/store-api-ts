import { body } from "express-validator";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userController } from "./../controllers/userController";
import { Router } from "express";

// const userController = require("../controllers/userController")
// const authMiddleware = require("../middlewares/authMiddleware")

export const userRouter = Router();
userRouter.post(
  "/registration",
  [body("email").isEmail(), body("password").isLength({ min: 5 }).withMessage("Min length 5 chars")],
  userController.create
);
userRouter.post("/login", userController.login);
// @ts-ignore
userRouter.get("/auth", AuthMiddleware, userController.check);

// router.post("/registration",userController.registration)
// router.post("/login",userController.login)
// router.get("/auth", authMiddleware ,userController.check)
