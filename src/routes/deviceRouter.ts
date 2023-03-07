import { Router } from "express";
import { deviceController } from "../controllers/deviceController";
import { RoleMiddleware } from "../middlewares/roleMiddleware";
// const roleMiddleware = require("../middlewares/roleMiddleware")

export const deviceRouter = Router();

deviceRouter.post("/", RoleMiddleware("ADMIN"), deviceController.create);
deviceRouter.get("/", deviceController.getAll);
deviceRouter.get("/:id", deviceController.getOne);
deviceRouter.put("/", RoleMiddleware("ADMIN"), deviceController.update);
deviceRouter.delete("/:id", RoleMiddleware("ADMIN"), deviceController.delete);
