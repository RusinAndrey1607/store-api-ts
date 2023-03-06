import { RoleMiddleware } from "../middlewares/roleMiddleware";
import { characteristiController } from "./../controllers/characteristicController";
import { Router } from "express";

export const characteristicRouter = Router();
characteristicRouter.post(
  "/",
  RoleMiddleware("ADMIN"),
  characteristiController.create
);
characteristicRouter.post(
  "/add",
  RoleMiddleware("ADMIN"),
  characteristiController.addToDevice
);
characteristicRouter.get(
  "/",
  RoleMiddleware("ADMIN"),
  characteristiController.getAllCharacteristics
);
characteristicRouter.get(
  "/values",
  RoleMiddleware("ADMIN"),
  characteristiController.getAllValues
);
