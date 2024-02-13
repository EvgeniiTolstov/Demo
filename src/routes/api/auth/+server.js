import { json } from '@sveltejs/kit';

import db from '$lib/db.js';

import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function GET({ request, cookies }) {

    const cookies2 = request.headers.get('cookie')
    const header_refresh_token = request.headers.get('refresh_token')
    const header_token = request.headers.get('token')

    const token = String(header_token ? header_token : cookies.get('token'))
    const refresh_token = header_refresh_token ? header_refresh_token : cookies.get('refresh_token')

    if (!token || !refresh_token || token == 'undefined' || refresh_token == 'undefined') {
        return json({
            error: 'Ошибка аутентификации',

        }, {
            status: 401
        });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return err;
        } else {
            return decoded;
        }
    });

    if (verify.name !== 'TokenExpiredError' && verify.name !== 'JsonWebTokenError') {

        const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })
        const usergroup = await Cmsmodel.findOne({ where: { models: 'users_groups' } })
        const group = await Cmsmodel.findOne({ where: { models: 'group' } })

        //собираем модель
        let attribute = rowsModel.json_attr
        let attribute2 = usergroup.json_attr
        let attribute3 = group.json_attr


        const model = sequelizer(attribute)
        const model2 = sequelizer(attribute2)
        const model3 = sequelizer(attribute3)

        const newModel = db.define('users', model);
        const newModel2 = db.define('users_groups', model2);
        const newModel3 = db.define('group', model3);


        const findUserGroup = await newModel2.findAll({ where: { user_id: verify.user_id } })

        let groups = []
        for (let i = 0; i < findUserGroup.length; i++) {
            const findGroup = await newModel3.findOne({ where: { id: findUserGroup[i].group_id } })
            groups.push(findGroup)
        }

        let groups_list = ''
        let groups_id = []
        for (let i = 0; i < groups.length; i++) {
            groups_list += groups[i].title + ', '
            groups_id.push(groups[i].id)
        }
        groups_list = groups_list.slice(0, -2)



        const findUser = await newModel.findOne({ where: { refresh_token: refresh_token } })
        if (!findUser) {
            return json({
                error: 'Ошибка аутентификации',
            }, {
                status: 401
            });
        }


        return json({
            findUser: {
                id: findUser.id,
                user_id: findUser.user_id,
                name: findUser.name,
                email: findUser.email,
                phone: findUser.phone,
                username: findUser.username,
                wallet: findUser.wallet,
            },
            groups,
            groups_list,
            groups_id,
        })

    }

    if (verify.name == 'TokenExpiredError') {

        const rowsModel = await Cmsmodel.findOne({ where: { models: 'users' } })
        const usergroup = await Cmsmodel.findOne({ where: { models: 'users_groups' } })
        const group = await Cmsmodel.findOne({ where: { models: 'group' } })


        let attribute = rowsModel.json_attr
        let attribute2 = usergroup.json_attr
        let attribute3 = group.json_attr

        const model = sequelizer(attribute)
        const model2 = sequelizer(attribute2)
        const model3 = sequelizer(attribute3)

        const newModel = db.define('users', model);
        const newModel2 = db.define('users_groups', model2);
        const newModel3 = db.define('group', model3);
        const findUser = await newModel.findOne({ where: { refresh_token: refresh_token } })
        const findUserGroup = await newModel2.findAll({ where: { user_id: findUser.user_id } })

        let groups = []
        for (let i = 0; i < findUserGroup.length; i++) {
            const findGroup = await newModel3.findOne({ where: { id: findUserGroup[i].group_id } })
            groups.push(findGroup)
        }
        ю
        let groups_list = ''
        let groups_id = []
        for (let i = 0; i < groups.length; i++) {
            groups_list += groups[i].title + ', '
            groups_id.push(groups[i].id)
        }
        groups_list = groups_list.slice(0, -2)


        if (findUser) {
            const token = jwt.sign({ user_id: findUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return json({
                findUser: {

                    id: findUser.id,
                    user_id: findUser.user_id,
                    name: findUser.name,
                    email: findUser.email,
                    phone: findUser.phone,
                    username: findUser.username,
                    refresh_token: findUser.refresh_token,
                    wallet: findUser.wallet,
                },
                token,
                groups,
                groups_list,
                groups_id,
            })
        }
    }

    if (verify.name === 'JsonWebTokenError') {

        return json({
            error: 'Ошибка аутентификации',
        }, {
            status: 401
        });
    }

}