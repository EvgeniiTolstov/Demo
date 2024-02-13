import { json } from '@sveltejs/kit';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import  db  from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import  Cookie  from 'cookie';
dotenv.config();

export async function POST(event) {
    const req = await event.request.json()
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })
const model = sequelizer(rowsModel.json_attr)
const newModel = db.define('users', model);
const rows = await newModel.findOne({ where: { email: req.email } })
if (!rows) {
    return json({
        error: 'Invalid email or password'
    }, {
        status: 401
    });
}else{
    const validPassword = await bcrypt.compare(req.password, rows.password);
    if (!validPassword) {
        return json({
            error: 'Invalid email or password'
        }, {
            status: 401
        });
    }else{

        const token = jwt.sign({ user_id: rows.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
       
        const cookie = Cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 24 * 365,
            path: '/'
        });
        const cookie2 = Cookie.serialize('refresh_token', rows.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 24 * 365,
            path: '/'
        });
       const cookie3 = Cookie.serialize('userid', rows.user_id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 24 * 365,
            path: '/'
        });

        return json({
            token: token,
            refresh_token: rows.refresh_token,
            userid : rows.user_id
        }, {
            headers: {
                'set-cookie': [cookie, cookie2, cookie3]
            }

        });
   
    }

}                                                              

}



