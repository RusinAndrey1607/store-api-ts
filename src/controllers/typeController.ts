import { Request, Response } from "express";
import { Type } from "../models/type.model";

class TypeController {
  async create(req: Request, res: Response) {
    const type = await Type.create(req.body.name);
    return res.json(type);
  }
  async getAll(req: Request, res: Response) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const type = await Type.delete(+id);
    return res.json(type);
  }
}
export const typeController = new TypeController();
