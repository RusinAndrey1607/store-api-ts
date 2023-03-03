import { Pool } from "pg";
import { config } from "dotenv";
config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // @ts-ignore
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const dbConnect = async () => {
  try {
    await pool.connect();
    console.log("Connect to database");
  } catch (error) {
    await pool.end();
    console.log(error);
    throw new Error("Postgresql error");
  }
};
