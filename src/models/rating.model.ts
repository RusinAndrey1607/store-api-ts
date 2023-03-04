import { pool } from "../db/db";

class RatingModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS ratings (
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE,
            device_id INT,
            rate SMALLINT NOT NULL DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE,
            FOREIGN KEY(device_id) REFERENCES devices ON DELETE CASCADE
        );`);
    return;
  }
  async delete(user_id: number) {
    return await pool.query(
      `DELETE FROM ratings WHERE user_id = ${user_id};`
    );
  }
  async create(body: { device_id: number; user_id: number; rate: number }) {
    return (
      await pool.query(
        `INSERT INTO ratings (device_id,user_id,rate) VALUES (${body.device_id},${body.user_id},${body.rate}) RETURNING id, user_id,device_id,rate;`
      )
    ).rows[0];
  }
}
export const Rating = new RatingModel();
