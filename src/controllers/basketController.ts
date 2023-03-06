import { UserRequest } from "./../middlewares/authMiddleware";
import { Response } from "express";
import { BasketDevice } from "../models/basket_device.model";

class BasketController {
  async addToBasket(req: UserRequest, res: Response) {
    const { device_id } = req.query;
    const { basket_id } = req.user;
    if (basket_id && device_id) {
      await BasketDevice.create({
        device_id: +device_id,
        basket_id: +basket_id,
      });
      return res.status(200).send("ADDED");
    }
    return res.status(404).send("Send basket_id and device_id");
  }
  async removeFromBasket(req: UserRequest, res: Response) {
    const { device_id } = req.query;
    const { basket_id } = req.user;

    if (basket_id && device_id) {
      await BasketDevice.delete({
        device_id: +device_id,
        basket_id: +basket_id,
      });
      return res.status(200).send("REMOVED");
    }
    return res.status(404).send("Send basket_id and device_id");
  }
  async getItemsFromBasket(req: UserRequest, res: Response) {
    const { basket_id } = req.user;
    if (basket_id) {
      const items = await BasketDevice.getItems(+basket_id);
      return res.status(200).json(items);
    }
    return res.status(404).send("Send basket_id and device_id");
  }
}
export const basketController = new BasketController();
