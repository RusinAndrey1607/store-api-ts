import { UserRequest } from "./../middlewares/roleMiddleware";
import { Request, Response } from "express";
import { Rating } from "../models/rating.model";

class RatingController {
  async create(req: Request, res: Response) {
    const { device_id, rate } = req.body;
    // @ts-ignore
    const { id: user_id } = req.user;
    const rateExists = await Rating.rateExists({device_id,user_id})
    if(rateExists){
    return res.status(400).json("You already rate this device");

    }
    const rating = await Rating.create({ device_id, user_id, rate });
    return res.json(rating);
  }
  async delete(req: Request, res: Response) {
    // @ts-ignore
    const { id: user_id } = req.user;
    const { id:device_id } = req.params;
    
    const rating = await Rating.delete(user_id, +device_id);
    return res.json(rating);
  }
}
export const ratingController = new RatingController();
