// @ts-nocheck
import { json } from '@sveltejs/kit';
import db from '$lib/db';
import {sequelizer} from '$lib/json-sequelize.js'
import Cmsmodel from "$lib/models/Cmsmodel.js"
import {auth} from '$lib/auth.js'
import dotenv from 'dotenv'
dotenv.config()

/** @type {import('./$types').RequestHandler} */

export async function GET({ url, params, cookies, request }) {
 
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
  
    let bearer = request.headers.get('authorization')
   if (bearer) {
    bearer = bearer.replace('Bearer ', '')
    }

  
if (bearer != process.env.BEARER) {
    if (get_permission.indexOf(true) === -1 && verifyGroup1 !== '1' ) {
        return json({
            data: 'no permission'
        })
    }
}

   
    let limit = url.searchParams.get('limit') || 10;
    let offset = url.searchParams.get('offset') || 0;
    let order = url.searchParams.get('order') || 'ASC';
    let order_by = url.searchParams.get('order_by') || 'id';
    let summa = url.searchParams.get('summ')? url.searchParams.get('summ') : '';
    let min = url.searchParams.get('min')? url.searchParams.get('min') : '';
    const rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const urlmodel = params.slug
    const allmodel = db.define(urlmodel, model)


   const props = await [...url.searchParams].reduce((acc, [key, value]) => {
    if (key === 'limit' || key === 'offset' || key === 'order' || key === 'order_by' || key === 'summ' || value === '') {
        return acc
    }
    

        if (key.includes('[]')) {
            const prop = key.replace('[]', '')
            if (acc[prop]) {
                acc[prop].push(value)
            } else {
                acc[prop] = [value]
            }
        } else {
            acc[key] = value
        }
      
       
        return acc


}, {})

    if (min !== '') {
        props[order_by] = {
            [db.Sequelize.Op.gte]: min
        }
    }

  
    const rows =  await allmodel.findAndCountAll({
        order: [
            [order_by, order]
        ],
        limit: limit,
        offset: offset,
        where: props 

        
    })

    if (summa !== '') {
        const rowsSumm = rows.rows.map((row) => {
            return row[summa]
        })
        summa = rowsSumm.reduce((acc, value) => {
            return acc + value
        }, 0)

    }else {
        summa = 0
    }


    return json({
        data:(rows),
        meta: {
            limit: limit,
            offset: offset,
            order: order,
            order_by: order_by,
            summ: summa,
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

 let bearer = event.request.headers.get('authorization')

 if (bearer) {
  bearer = bearer.replace('Bearer ', '')
  }


if (bearer != process.env.BEARER) {
  if (get_permission.indexOf(true) === -1 && verifyGroup1 !== '1' ) {
      return json({
          data: 'no permission'
      })
  }
}


    const rowsModel =  await Cmsmodel.findAll({where:{models:event.params.slug}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const urlmodel = event.params.slug
    const allmodel = db.define(urlmodel, model)
    const req = await event.request.json()
  
    let id = req.id
    try {
        if (id){
            const createModel = await allmodel.update(req, {
                where: {
                    id: id
                }
            });
            return json({
                data: createModel
            });
        
        }else{
            const createModel = await allmodel.create(req);
            return json({
                data: createModel
            });
        }
       
    }
    catch (error) {
        return json({
            data: error.errors[0].message
        });
    }

}


export async function PUT({request, cookies, params}) {

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
        get_permission.push(permissions[i].m_post)
    }
    }
    
     let bearer = request.headers.get('authorization')
    
     if (bearer) {
      bearer = bearer.replace('Bearer ', '')
      }
    
    
    if (bearer != process.env.BEARER) {
      if (get_permission.indexOf(true) === -1 && verifyGroup1 !== '1' ) {
          return json({
              data: 'no permission'
          })
      }
    }
    
    
        const rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
        const attribute = rowsModel[0].json_attr
        const model = sequelizer(attribute)
        const urlmodel = params.slug
        const allmodel = db.define(urlmodel, model)
        const req = await request.json()
        const id = req.id
        try {
            if (id){
                const createModel = await allmodel.update(req, {
                    where: {
                        id: id
                    }
                });
            
            }
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

