import { pool } from "../db/db";

class CharacteristiValuecModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS values (
            id SERIAL PRIMARY KEY,
            characteristic_value VARCHAR(100) UNIQUE NOT NULL
        );`);
    return;
  }
  async delete(id: number) {
    return await pool.query(
      `DELETE FROM values WHERE id = ${id};`
    );
  }
  async create(characteristic_value: string) {
    return (
      await pool.query(
        `INSERT INTO values (characteristic_value) VALUES ('${characteristic_value}') RETURNING id, characteristic_value;`
      )
    ).rows[0];
  }
}
export const CharacteristicValue = new CharacteristiValuecModel();
