import { ValueCharacteristic } from "./../models/valueCharacterisics.model";
import { CharacteristicValue } from "./../models/characteristic_value.model";
import { Request, Response } from "express";
import { Characteristic } from "../models/characteristic.model";

class CharacteristiController {
  async createCharacteristic(req: Request, res: Response) {
    const { characteristic_name } = req.body;
    const characteristic = await Characteristic.create(characteristic_name);
    return res.json(characteristic);
  }
  async createValue(req: Request, res: Response) {
    const { value_name } = req.body;
    const value = await CharacteristicValue.create(value_name);

    return res.json(value);
  }
  async getAllCharacteristics(req: Request, res: Response) {
    const characteristics = await Characteristic.findAll();
    return res.json(characteristics);
  }
  async getAllValues(req: Request, res: Response) {
    const values = await CharacteristicValue.findAll();
    return res.json(values);
  }
  async getCharacteristicsWithValues(req: Request, res: Response) {
    const { id: device_id } = req.params;
    const values = await ValueCharacteristic.findAll(+device_id);
    return res.json(values);
  }
  async addToDevice(req: Request, res: Response) {
    const { characteristic_id, value_id, device_id } = req.body;
    const characteristic = await ValueCharacteristic.create({
      characteristic_id,
      value_id,
      device_id,
    });
    return res.status(200).json(characteristic)
  }
}
export const characteristiController = new CharacteristiController();
