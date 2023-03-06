import { NextFunction, Request, Response } from "express";
import path from "path";
import uuid from "uuid";
import { Device } from "../models/device.model";
import { ApiError } from "../error/ApiError";
import { unlink } from "fs";
class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let { name, price, brand_id, type_id } = req.body;
      // @ts-ignore
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brand_id,
        type_id,
        img: fileName,
      });

      return res.json(device);
    } catch (error: any) {
      console.log(error);
      return next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    let { brand_id, type_id, limit, page }: any = req.query;
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    let offset = Number(page) * Number(limit) - Number(limit);
    let devices;
    if (!brand_id && !type_id) {
      devices = await Device.findAll({ limit, offset });
    }
    if (!brand_id && type_id) {
      devices = await Device.findAll({
        where: {
          type_id,
        },
        offset,
        limit,
      });
    }
    if (brand_id && !type_id) {
      devices = await Device.findAll({
        where: {
          brand_id,
        },
        offset,
        limit,
      });
    }
    if (brand_id && type_id) {
      devices = await Device.findAll({
        where: {
          brand_id,
          type_id,
        },
        offset,
        limit,
      });
    }
    return res.json(devices);
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    let { id } = req.params;
    const device = await Device.findOne(+id);
    return res.json(device);
  }
  async update(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    // @ts-ignore
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    
    if (req.body.img) {
      unlink(path.resolve(__dirname, "..", "static", req.body.img), () => {
        console.log("delete file with name", req.body.img);
      });
    }
    const updatedDevice = await Device.update(req.body);
    return res.json(updatedDevice);
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    let { id } = req.params;
    const device = await Device.delete(+id);
    return res.json(device);
  }
}
export const deviceController = new DeviceController();
