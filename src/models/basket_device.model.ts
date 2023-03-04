import { pool } from "../db/db";

// class BasketDeviceModel {
//   async createTable() {
//     await pool.query(`CREATE TABLE IF NOT EXISTS basket_devices(
//             id SERIAL PRIMARY KEY,
//             user_id INT UNIQUE,
//             FOREIGN KEY(user_id) REFERENCES basket_devices ON DELETE CASCADE
//         );`);
//     return;
//   }
//   async delete(user_id: number) {
//     return await pool.query(`DELETE FROM basket_devices WHERE user_id = ${user_id};`);
//   }
//   async create(user_id:number) {
//     return (
//       await pool.query(
//         `INSERT INTO baskets (user_id) VALUES (${user_id}) RETURNING id, user_id;`
//       )
//     ).rows[0];
//   }
// }
// export const BasketDevice = new BasketDeviceModel();
