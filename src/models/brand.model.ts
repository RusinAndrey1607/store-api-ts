import { pool } from "../db/db";

class BrandModel {
    async createTable() {
      await pool.query(`CREATE TABLE IF NOT EXISTS brands(
              id SERIAL PRIMARY KEY,
              name VARCHAR(100) NOT NULL UNIQUE
          );`);
      return;
    }
    async delete(id: number) {
      return await pool.query(`DELETE FROM brands WHERE id = ${id};`);
    }
    async findOne(id: number) {
      return await pool.query(`SELECT id,name FROM brands WHERE id = ${id};`);
    }
    async findAll() {
      return await pool.query(`SELECT id,name FROM brands;`);
    }
  
    async create(name: string) {
      return (
        await pool.query(
          `INSERT INTO brands (name) VALUES ('${name}') RETURNING id, name;`
        )
      ).rows[0];
    }
  }
  export const Brand = new BrandModel();
  