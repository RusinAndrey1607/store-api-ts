import {
  OptionsType,
  generateOptionsQuery,
} from "./../utils/generateQueryWithOptions";
import { pool } from "../db/db";

interface IDeviceCreation {
  name: string;
  price: number;
  brand_id: number;
  type_id: number;
  img: string;
}
interface IDevice extends IDeviceCreation {
  id: number;
  created_at: string;
}
class DeviceModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS devices(
              id SERIAL PRIMARY KEY,
              name VARCHAR(100) NOT NULL UNIQUE,
              price MONEY NOT NULL,
              img VARCHAR(100),
              brand_id INT,
              type_id INT,
              created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
              FOREIGN KEY(brand_id) REFERENCES brands ON DELETE CASCADE,
              FOREIGN KEY(type_id) REFERENCES types ON DELETE CASCADE
          );`);
    return;
  }

  async create(body: IDeviceCreation) {
    return (
      await pool.query(
        `INSERT INTO devices (name,price,img,brand_id,type_id) VALUES ('${body.name}',${body.price}, ${body.brand_id},${body.type_id}) RETURNING id, name,price,img,brand_id,type_id;`
      )
    ).rows[0];
  }
  async findOne(id: number) {
    return await pool.query(`SELECT d.id,d.name,d.price,d.created_at,d.img,b.name as brand, t.name as type, (SELECT avg(rate) FROM ratings WHERE device_id = d.id) as rate FROM devices as d JOIN types as t ON t.id=d.type_id JOIN brands as b ON b.id = d.brand_id  WHERE id = ${id};`);
  }
  async findAll(options: OptionsType) {
    const str = generateOptionsQuery(options);
    const data = await pool.query(`SELECT d.id,d.name,d.price,d.img,d.created_at,b.name as brand, t.name as type, (SELECT avg(rate) FROM ratings WHERE device_id = d.id) as rate FROM devices as d JOIN types as t ON t.id=d.type_id JOIN brands as b ON b.id = d.brand_id ${str};`);
    return {
      rows: data.rows,
      count: data.rowCount,
    };
  }
  async update(updatedDevice: IDevice) {
    let updateQuery = "";
    console.log(updatedDevice);
    
    const keys = Object.keys(updatedDevice);
    keys.map((item) => {
      // @ts-ignore
      updateQuery += `${item} = '${updatedDevice[item]}', `;
    });
    return (
      await pool.query(
        `UPDATE devices SET ${updateQuery} RETURNING id, name,price,img,brand_id,type_id;`
      )
    ).rows[0];
  }
  async delete(id: number) {
    return await pool.query(`DELETE FROM devices WHERE id = ${id};`);
  }
}
export const Device = new DeviceModel();
