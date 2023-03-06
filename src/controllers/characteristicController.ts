import { ValueCharacteristic } from "./../models/valueCharacterisics.model";
import { CharacteristicValue } from "./../models/characteristic_value.model";
import { Request, Response } from "express";
import { Characteristic } from "../models/characteristic.model";

class CharacteristiController {
  async create(req: Request, res: Response) {
    const { characteristic_name, characteristic_value, device_id } = req.body;
    const characteristic = await Characteristic.create(characteristic_name);
    const value = await CharacteristicValue.create(characteristic_value);
    await ValueCharacteristic.create({
      characteristic_id: characteristic.id,
      value_id: value.id,
      device_id,
    });
    return res.json(characteristic);
  }
  async getAllCharacteristics(req: Request, res: Response) {
    const characteristics = await Characteristic.findAll();
    return res.json(characteristics);
  }
  async getAllValues(req: Request, res: Response) {
    const values = await CharacteristicValue.findAll();
    return res.json(values);
  }
  async addToDevice(req: Request, res: Response) {
    const { characteristic_id, value_id, device_id } = req.body;
    await ValueCharacteristic.create({
      characteristic_id,
      value_id,
      device_id,
    });
  }
}
export const characteristiController = new CharacteristiController();
