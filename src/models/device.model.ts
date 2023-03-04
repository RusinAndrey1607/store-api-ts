import { pool } from "../db/db";

interface IDeviceCreation {
  name:string, 
  price:number,
  brand_id:number,
  type_id:number,
  img:string,
}
interface IDevice extends IDeviceCreation{
  id:number,
  created_at:string
  
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
    async delete(id: number) {
      return await pool.query(`DELETE FROM devices WHERE id = ${id};`);
    }
    async findOne(id: number) {
      return await pool.query(`SELECT id,name FROM devices WHERE id = ${id};`);
    }
    async findAll() {
      return await pool.query(`SELECT id,name FROM devices;`);
    }
  
    async create(body:IDeviceCreation) {
      return (
        await pool.query(
          `INSERT INTO devices (name,price,img,brand_id,type_id) VALUES ('${body.name}',${body.price}, ${body.brand_id},${body.type_id}) RETURNING id, name;`
        )
      ).rows[0];
    }
  }
  export const Device = new DeviceModel();
  