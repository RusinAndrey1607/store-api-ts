import { Router } from "express"
import { deviceController } from "../controllers/deviceController"
// const roleMiddleware = require("../middlewares/roleMiddleware")


export const deviceRouter = Router()

// router.post("/",roleMiddleware("ADMIN"), deviceController.create)
deviceRouter.post("/", deviceController.create)
deviceRouter.get("/", deviceController.getAll)
deviceRouter.get("/:id", deviceController.getOne)
deviceRouter.put("/", deviceController.update)
deviceRouter.delete("/:id", deviceController.delete)

