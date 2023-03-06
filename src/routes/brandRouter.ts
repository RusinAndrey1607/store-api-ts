import { RoleMiddleware } from "../middlewares/roleMiddleware";
import { brandController } from "./../controllers/brandController";
import { Router } from "express";

export const brandRouter = Router({});
brandRouter.post("/", RoleMiddleware("ADMIN"), brandController.create);
brandRouter.get("/", brandController.getAll);
brandRouter.delete("/:id", RoleMiddleware("ADMIN"), brandController.delete);
