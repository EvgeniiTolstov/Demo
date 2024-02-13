import { error } from '@sveltejs/kit';
//import { json } from '@sveltejs/kit';
import db from '$lib/db.js';
import {sequelizer} from '$lib/json-sequelize.js'
import Cmsmodel from "$lib/models/Cmsmodel.js"




export async function load({ url, params }) {
        let limit = url.searchParams.get('limit') || 10
        let offset = url.searchParams.get('offset') || 0
        const rowsModel =  await Cmsmodel.findOne({where:{models:params.slug}})
        const attribute = rowsModel.json_attr
    
     let type = Object.values(attribute.properties)
        const model = sequelizer(attribute)
        const urlmodel = params.slug
        let myData = db.define(urlmodel, model)
        
        const rows =  await myData.findAndCountAll({limit:limit,offset:offset})
        let newData = JSON.stringify(rows)
        let jsonAttrebutes = JSON.stringify(attribute)
        return {
            attributes:jsonAttrebutes,
            data:newData,
            type:JSON.stringify(type),
            slug:params.slug,
            meta: {
                  limit: limit,
                  offset: offset,
                  total: rows.rows.length,
            }
           
        }
    }

   