import { json } from '@sveltejs/kit';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import  db  from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export async function POST(event){
    const req = await event.request.json()
    const { email, name, phone, inn, token } = req;
    const JWT_SECRET:any = process.env.JWT_SECRET;
    const  userid:any = jwt.verify(token, JWT_SECRET);
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })
    const model = sequelizer(rowsModel.json_attr)
const newModel = db.define('users', model);
//найти пользователя по user_id
const rows = await newModel.findOne({ where: { user_id: userid } })

//если пользователь найден
if (rows) {
    //обновить данные
    const update = await newModel.update({ email, name, phone,inn }, { where: { user_id: userid } })
    return json({ status: 'ok', message: 'Данные обновлены' })
} else {
    //если пользователь не найден
    return json({ status: 'error', message: 'Пользователь не найден' })

}
}

    
