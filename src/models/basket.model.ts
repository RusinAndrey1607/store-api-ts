import { pool } from "../db/db";

class BasketModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS baskets(
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE,
            FOREIGN KEY(user_id) REFERENCES users ON DELETE CASCADE
        );`);
    return;
  }
  async delete(user_id: number) {
    return await pool.query(`DELETE FROM baskets WHERE user_id = ${user_id};`);
  }
  async create(user_id:number) {
    return (
      await pool.query(
        `INSERT INTO baskets (user_id) VALUES (${user_id}) RETURNING id, user_id;`
      )
    ).rows[0];
  }
}
export const Basket = new BasketModel();
