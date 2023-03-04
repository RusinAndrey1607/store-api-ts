import { pool } from "../db/db";

class CharacteristicModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS characteristics (
            id SERIAL PRIMARY KEY,
            characteristic_name VARCHAR(100) UNIQUE NOT NULL
        );`);
    return;
  }
  async delete(id: number) {
    return await pool.query(
      `DELETE FROM characteristics WHERE id = ${id};`
    );
  }
  async create(characteristic_name: string) {
    return (
      await pool.query(
        `INSERT INTO characteristics (characteristic_name) VALUES ('${characteristic_name}') RETURNING id, characteristic_name;`
      )
    ).rows[0];
  }
}
export const Characteristic = new CharacteristicModel();
