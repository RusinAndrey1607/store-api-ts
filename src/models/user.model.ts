import { pool } from "../db/db";

export interface IUserCreation {
  email: string;
  password: string;
  role?: string;
}

export interface IUSer extends IUserCreation {
  id: number;
}
class UserModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            role VARCHAR(100) NOT NULL DEFAULT 'USER',
            password VARCHAR(100) NOT NUll
        );`);
    return;
  }
  async findAll() {
    return (await pool.query(`SELECT * FROM users;`)).rows;
  }
  async findByEmail(email: string) {
    return (
      await pool.query(
        `SELECT email,role,password,id FROM users WHERE email = '${email}' ;`
      )
    ).rows[0];
  }
  async delete(id: number) {
    return await pool.query(`DELETE FROM users WHERE id = ${id};`);
  }
  async create(body: IUserCreation) {
    return (
      await pool.query(
        `INSERT INTO users (email,password,role) VALUES ('${body.email}','${body.password}','${body.role}') RETURNING email, password, role, id;`
      )
    ).rows[0];
  }
}
export const User = new UserModel();
