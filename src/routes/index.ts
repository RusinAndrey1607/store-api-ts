import { characteristicRouter } from "./characteristicRouter";
import { brandRouter } from "./brandRouter";
import { Router } from "express";
import { userRouter } from "./userRouter";
import { deviceRouter } from "./deviceRouter";
import { typeRouter } from "./typeRouter";

export const approuter = Router();

approuter.use("/user", userRouter);
approuter.use("/device", deviceRouter);
approuter.use("/type", typeRouter);
approuter.use("/brand", brandRouter);
approuter.use("/characteristic", characteristicRouter);
