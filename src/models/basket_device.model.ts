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
  async delete(device_id: number) {
    return await pool.query(
      `DELETE FROM basket_devices WHERE device_id = ${device_id};`
    );
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
