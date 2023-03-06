import { Request, Response } from "express";
import { Brand } from "../models/brand.model";

class BrandController {
  async create(req: Request, res: Response) {
    const brand = await Brand.create(req.body.name);
    return res.json(brand);
  }
  async getAll(req: Request, res: Response) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const brand = await Brand.delete(+id);
    return res.json(brand);
  }
}
export const brandController = new BrandController();
