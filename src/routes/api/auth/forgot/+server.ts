import { json } from '@sveltejs/kit';

import  db  from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export async function POST(event) {
    const req = await event.request.json()

    const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })

const model = sequelizer(rowsModel.json_attr)
const newModel = db.define('users', model);
const rows = await newModel.findOne({ where: { email: req.username } })


if (!rows) {
    return json({
        message: 'User not found'
    }, {
        status: 404

    });
}else{
    // если пользователь найден то сгенерировать reset_password  и записать его в базу, отправить письмо с ссылкой на сброс пароля
    const token = jwt.sign({ user_id: rows.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    await newModel.update({ reset_password: token }, { where: { user_id: rows.user_id } })
    
    // отправить письмо с ссылкой на сброс пароля
    return json({
        token:token
    }, {
        status: 200
    });
}
}

export async function PATCH(event) {
    const req = await event.request.json()

    const toket = req.reset

    const decoded = jwt.verify(toket, process.env.JWT_SECRET);
  
    if (!decoded) {
        return json({
            message: 'Token not found'
        }, {
            status: 404

        });
    } else {
 
        const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })
        const model = sequelizer(rowsModel.json_attr)
        const newModel = db.define('users', model);
        const rows = await newModel.findOne({ where: { reset_password: toket } })
     
        if (!rows) {
            return json({
                message: 'User not found'
            }, {
                status: 404

            });
        }
       
        return json({
            email: rows.email
        }, {
            status: 200
        });
    }
}

    