import { Router } from "express"
import { ratingController } from "../controllers/ratingController"



export const rateRouter =  Router()
rateRouter.post("/", ratingController.create)
rateRouter.delete("/:id", ratingController.create)


