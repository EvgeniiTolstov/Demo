

import db from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();


export async function auth(token, refresh_token) {
    if (!token && !refresh_token) {
        return {
            findUser: 'no_auth',
            groups: 'no_auth',
            groups_list: '0',
            groups_id: '0',
            user_id: 'Cookie.parse(cookies).userid',

        }
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    });
    if (verify) {
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
        const findUser = await newModel.findOne({ where: { refresh_token: refresh_token } })
        if (!findUser) {
            return {
                findUser: 'no_auth',
                groups: 'no_auth',
                groups_list: '0',
                groups_id: '0',
                user_id: 'Cookie.parse(cookies).userid',


            }
        }

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

        return {
            findUser: findUser,
            groups: groups,
            groups_list: groups_list,
            groups_id: groups_id,
            user_id: 'Cookie.parse(cookies).userid',

        }

    } else {
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

        let groups_list = ''
        let groups_id = []
        for (let i = 0; i < groups.length; i++) {
            groups_list += groups[i].title + ', '
            groups_id.push(groups[i].id)
        }
        groups_list = groups_list.slice(0, -2)


        if (findUser) {

            return {
                findUser: findUser,
                groups: groups,
                groups_list: groups_list,
                groups_id: groups_id,
                user_id: 'Cookie.parse(cookies).userid',

            }

        }
    }
}


