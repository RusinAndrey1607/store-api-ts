import { UserRequest } from "./../middlewares/roleMiddleware";
import { Request, Response } from "express";
import { Rating } from "../models/rating.model";

class RatingController {
  async create(req: Request, res: Response) {
    const { device_id, rate, user_id } = req.body;
    const rating = await Rating.create({ device_id, user_id, rate });
    return res.json(rating);
  }
  async delete(req: UserRequest, res: Response) {
    const { id: user_id } = req.user;
    const { device_id } = req.params;
    const rating = await Rating.delete(user_id, +device_id);
    return res.json(rating);
  }
}
export const ratingController = new RatingController();
