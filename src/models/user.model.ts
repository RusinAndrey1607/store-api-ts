import { pool } from "../db/db";

interface IUserCreation{
    email:string,
    password:string,
    role?:string,

}

interface IUSer extends IUserCreation{
    id:number,
}
class UserModel{
    async createTable(){
        await pool.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) NOT NULL UNIQUE,
            role VARCHAR(100) NOT NULL DEFAULT 'USER',
            password VARCHAR(100) NOT NUll
        );`)

    }
    async findAll(){
       return (await pool.query(`SELECT * FROM users;`)).rows
    }
    async create(body:IUserCreation){
        return (await pool.query(`INSERT INTO users (email,password,role) VALUES ('${body.email}','${body.password}','${body.role}') RETURNING email, password, role;`)).rows[0]
    }
}
export const User = new UserModel()

