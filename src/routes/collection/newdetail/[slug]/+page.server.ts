import { error } from '@sveltejs/kit';
//import { json } from '@sveltejs/kit';
import db from '$lib/db.js';
import {sequelizer} from '$lib/json-sequelize.js'
import Cmsmodel from "$lib/models/Cmsmodel.js"
import dotenv from 'dotenv'

dotenv.config()



export async function load({ url, params }) {
  //  console.log("params",params)
        let limit = url.searchParams.get('limit') || 10000
        let offset = url.searchParams.get('offset') || 0
        let id:number = url.searchParams.get('id') || 0
        const rowsModel =  await Cmsmodel.findOne({where:{models:params.slug}})
        const attribute = rowsModel.json_attr
    
     let type = Object.values(attribute.properties)
        const model = sequelizer(attribute)
        const urlmodel = params.slug
        let myData = db.define(urlmodel, model)
        
        const rows =  await myData.findAndCountAll({
           order: [
            ['id', 'ASC'],
            ],
            limit: limit,
            offset: offset,
        })


            
        let newData = JSON.stringify(rows)
        let jsonAttrebutes = JSON.stringify(attribute)
     //   console.log("attribute-----###",JSON.stringify(type))
     let rowdata = ''
   
     if (id>0){
         const myData2 = db.define(urlmodel, model)

        const rowsdata =  await myData2.findOne({where:{id:id}})
        rowdata = JSON.stringify(rowsdata) 
        
    }else {
        rowdata = JSON.stringify({})
    }
        return {
            attributes:jsonAttrebutes,
            data:newData,
            type:JSON.stringify(type),
            slug:params.slug,
            rowdata:rowdata,
            meta: {
                  limit: limit,
                  offset: offset,
                  total: rows.rows.length,
            }
           
        }
    }

   /** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ params, request }) => {
        const req = await request.formData()
        const urlmodel = params.slug
        console.log("req225",req)
        const origin = request.headers.get('origin')
        const apiuri = `${origin}/api/v2/${urlmodel}`
        const bearer = process.env.BEARER

        const res = await fetch(apiuri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearer}`
            },
            body: JSON.stringify(Object.fromEntries(req))
        })
        const data = await res.json()

        return {
            status: res.status,
            body: data
        }

      
    }
}