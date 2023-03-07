import { Router } from "express";
import { ratingController } from "../controllers/ratingController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export const rateRouter = Router();
rateRouter.post("/", AuthMiddleware, ratingController.create);
rateRouter.delete("/:id", AuthMiddleware, ratingController.delete);
