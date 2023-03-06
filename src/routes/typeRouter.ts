import { Router } from "express"
import { typeController } from "../controllers/typeController"
import { RoleMiddleware } from "../middlewares/roleMiddleware"



export const typeRouter =  Router()
typeRouter.post("/",RoleMiddleware("ADMIN"), typeController.create)
typeRouter.delete("/:id",RoleMiddleware("ADMIN"), typeController.delete)
typeRouter.get("/", typeController.getAll)

