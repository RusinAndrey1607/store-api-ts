import { pool } from "../db/db";

class BasketDeviceModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS basket_devices(
            id SERIAL PRIMARY KEY,
            basket_id INT UNIQUE,
            device_id INT,
            FOREIGN KEY(basket_id) REFERENCES baskets ON DELETE CASCADE,
            FOREIGN KEY(device_id) REFERENCES devices ON DELETE CASCADE
        );`);
    return;
  }
  async delete(body: { device_id: number; basket_id: number }) {
    return await pool.query(
      `DELETE FROM basket_devices WHERE device_id = ${body.device_id} basket_id=${body.basket_id};`
    );
  }
  async getItems(basket_id: number) {
    return (await pool.query(
      `SELECT bd.basket_id, d.id,d.name,d.price,d.created_at,d.img,b.name as brand, t.name as type, (SELECT avg(rate) FROM ratings WHERE device_id = d.id) as rate FROM basket_devices as bd  JOIN devices as d ON bd.device_id = d.id JOIN types as t ON t.id=d.type_id JOIN brands as b ON b.id = d.brand_id  WHERE bd.basket_id = ${basket_id};`
    )).rows
  }
  async create(body: { device_id: number; basket_id: number }) {
    return (
      await pool.query(
        `INSERT INTO baskets (device_id,basket_id) VALUES (${body.device_id},${body.basket_id}) RETURNING id, basket_id,device_id;`
      )
    ).rows[0];
  }
}
export const BasketDevice = new BasketDeviceModel();
