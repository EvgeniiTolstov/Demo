
import { json } from '@sveltejs/kit';
import isEmail from 'validator/lib/isEmail';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import  db  from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import  Cookie  from 'cookie';
dotenv.config();



export async function POST(event) {
    const req = await event.request.json()
   

    if (!req.email || !req.password || !req.username) {
        return json({
            error: 'Missing email or password or username'
        }, {
            status: 400
        });
    }
    if (!isEmail(req.email) || req.password.length < 4 || req.username.length < 4) {
        return json({
            error: 'Invalid email or password or username'
        }, {    
            status: 400
        });
    }
const salt = await bcrypt.genSalt(10);
req.password = await bcrypt.hash(req.password, salt);
req.user_id = uuidv4();
req.refresh_token = crypto.randomUUID();
const token = jwt.sign({ user_id: req.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
req.activation_link = crypto.randomUUID();

    const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('users', model);
    
    try {
        const createModel = await newModel.create(req);
    const cookie = Cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 24 * 365,
        path: '/'
    });
const cookie2 = Cookie.serialize('refresh_token', req.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 * 24 * 365,
        path: '/'
    });

        return json({
            data: {
                token,
                refresh_token: req.refresh_token,
                user_id: req.user_id,
                username: req.username,
                email: req.email,
                activation_link: req.activation_link
            }
        }, {
            headers: {
                'Set-Cookie': [
                    cookie,
                    cookie2
                ]
            }
        });

    } catch (error) {
        return json({
            data: error.errors[0].message
        });

    }
}


