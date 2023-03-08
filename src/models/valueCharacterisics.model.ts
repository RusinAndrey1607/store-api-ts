import { pool } from "../db/db";

class ValueCharacteristicModel {
  async createTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS value_characteristics  (
            id SERIAL PRIMARY KEY,
            characteristic_id INT,
            value_id INT,
            device_id INT ,
            FOREIGN KEY(characteristic_id) REFERENCES characteristics ON DELETE CASCADE,
            FOREIGN KEY(value_id) REFERENCES values ON DELETE CASCADE,
            FOREIGN KEY(device_id) REFERENCES devices ON DELETE CASCADE
        );`);
    return;
  }
  async delete(id: number) {
    return await pool.query(
      `DELETE FROM value_characteristics WHERE id = ${id};`
    );
  }
  async findAll(device_id:number){
    return (await pool.query(`SELECT  v.characteristic_value as value, c.characteristic_name as option FROM value_characteristics as vc JOIN values as v on v.id=vc.value_id JOIN characteristics as c on c.id = vc.characteristic_id  WHERE device_id=${device_id}`)).rows
  }
  async create(body: {
    characteristic_id: number;
    value_id: number;
    device_id: number;
  }) {
    return (
      await pool.query(
        `INSERT INTO value_characteristics (characteristic_id,value_id,device_id) VALUES (${body.characteristic_id},${body.value_id},${body.device_id}) RETURNING id, characteristic_id, value_id;`
      )
    ).rows[0];
  }
}
export const ValueCharacteristic = new ValueCharacteristicModel();
