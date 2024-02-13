// @ts-nocheck
import { json } from '@sveltejs/kit';
import db from '$lib/db';
import {sequelizer} from '$lib/json-sequelize.js'
import Cmsmodel from "$lib/models/Cmsmodel.js"
import {auth} from '$lib/auth.js'
// корс не работает
 import cors from 'cors'

/** @type {import('./$types').RequestHandler} */

export async function GET({ url, params, cookies }) {
    const token = cookies.get('token')
    const refresh_token = cookies.get('refresh_token')
    const verify = await auth(token, refresh_token).then((res) => {
        return res
    })  

let verifyGroup = [2]
let verifyGroup1 = ''
  for (let i = 0; i < verify.groups_id.length; i++) {
    if (verify.groups_id[i] === 1) {
        verifyGroup.push(1)
        verifyGroup1 = '1'
        break
    }
}

    const permission_model = await Cmsmodel.findAll({where:{models:'permission_model'}})
    const permissionattr = permission_model[0].json_attr
    const permission = sequelizer(permissionattr)

    const permissionmodel = db.define('permission_model', permission)

    const permissions = await permissionmodel.findAll({where:{slug_model:params.slug}})
    const permissionsCount = permissions.length

    let get_permission = []
    if (permissionsCount > 0 && verifyGroup !== '1')  {
    for (let i = 0; i < permissions.length; i++) {
        get_permission.push(permissions[i].m_get)
    }
    }

    if (get_permission.indexOf(true) === -1 && verifyGroup1 !== '1') {
        return json({
            data: 'no permission'
        })
    }

    let limit = url.searchParams.get('limit') || 10
    let offset = url.searchParams.get('offset') || 0
    let order = url.searchParams.get('order') || 'ASC'
    let order_by = url.searchParams.get('order_by') || 'id'
    const rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const urlmodel = params.slug
    const allmodel = db.define(urlmodel, model)

   const props = await [...url.searchParams].reduce((acc, [key, value]) => {
    if (key === 'limit' || key === 'offset' || key === 'order' || key === 'order_by' || value === '') {
        return acc
    }
    acc[key] = value
    return acc

}, {})


    const rows =  await allmodel.findAndCountAll({
        order: [
            [order_by, order]
        ],
        where:props,
        limit:limit,
        offset:offset
    })

    return json({
        data:(rows),
        meta: {
            limit: limit,
            offset: offset,
            total: rows.rows.length,

        }

    })

}


export async function POST(event) {

const token = event.cookies.get('token')
const refresh_token = event.cookies.get('refresh_token')
const verify = await auth(token, refresh_token).then((res) => {
    return res
})  


let verifyGroup = [2]
let verifyGroup1 = ''
  for (let i = 0; i < verify.groups_id.length; i++) {
    if (verify.groups_id[i] === 1) {
        verifyGroup.push(1)
        verifyGroup1 = '1'
        break
    }
}

const permission_model = await Cmsmodel.findAll({where:{models:'permission_model'}})

const permissionattr = permission_model[0].json_attr

const permission = sequelizer(permissionattr)

const permissionmodel = db.define('permission_model', permission)

const permissions = await permissionmodel.findAll({where:{slug_model:event.params.slug}})
const permissionsCount = permissions.length
let get_permission = []
if (permissionsCount > 0 && verifyGroup !== '1')  {
for (let i = 0; i < permissions.length; i++) {
    get_permission.push(permissions[i].m_post)
}
}

if (get_permission.indexOf(true) === -1 && verifyGroup1 !== '1') {
    return json({
        data: 'no permission'
    })
}


    const rowsModel =  await Cmsmodel.findAll({where:{models:event.params.slug}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const urlmodel = event.params.slug
    const allmodel = db.define(urlmodel, model)
    const req = await event.request.json()
    try {
        const createModel = await allmodel.create(req);
        return json({
            data: createModel
        });
    }
    catch (error) {
        return json({
            data: error.errors[0].message
        });
    }

}

export async function PUT(event) {
    const rowsModel =  await Cmsmodel.findAll({where:{models:event.params.slug}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const urlmodel = event.params.slug
    const allmodel = db.define(urlmodel, model)
    const req = await event.request.json()
    const updateModel = await allmodel.update(req, {
        where: {
            id: req.id
        }
    });
    return json({
        data: updateModel
    });
}

export async function DELETE(event) {
    const rowsModel =  await Cmsmodel.findAll({where:{models:event.params.slug}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const urlmodel = event.params.slug
    const allmodel = db.define(urlmodel, model)
    const req = await event.request.json()
    const deleteModel = await allmodel.destroy({
        where: {
            id: req.id
        }
    });
    return json({
        data: deleteModel
    });
}

