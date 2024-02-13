import { Sequelize } from 'sequelize';
//import env from './env.config';

import dotenv from 'dotenv'
dotenv.config();

import { createNamespace } from 'cls-hooked';

export const namespace = createNamespace('ns');
Sequelize.useCLS(namespace);


const db = new Sequelize({
    dialect: "postgres",
    // logging: process.env.DB_LOG ? console.log : false,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  //  timezone: '+00:00'
});



export default db;

export function openConnection() {
    return db.authenticate();
}

export function closeConnection() {
    return db.close();
}




