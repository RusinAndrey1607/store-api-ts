import { Router } from "express";
import { basketController } from "../controllers/basketController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export const basketRouter = Router({});
// @ts-ignore
basketRouter.post("/", AuthMiddleware, basketController.addToBasket);
// @ts-ignore
basketRouter.get("/", AuthMiddleware, basketController.getItemsFromBasket);
// @ts-ignore
basketRouter.delete("/:id", AuthMiddleware, basketController.removeFromBasket);
