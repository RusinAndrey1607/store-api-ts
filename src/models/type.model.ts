import { pool } from "../db/db";

class TypeModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS types(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
        );`);
    return;
  }
  async delete(id: number) {
    return await pool.query(`DELETE FROM types WHERE id = ${id};`);
  }
  async findOne(id: number) {
    return (await pool.query(`SELECT id,name FROM types WHERE id = ${id};`)).rows[0]
  }
  async findAll() {
    return (await pool.query(`SELECT id,name FROM types;`)).rows
  }

  async create(name: string) {
    return (
      await pool.query(
        `INSERT INTO types (name) VALUES ('${name}') RETURNING id, name;`
      )
    ).rows[0];
  }
}
export const Type = new TypeModel();
