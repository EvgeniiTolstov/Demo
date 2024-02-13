import { json } from '@sveltejs/kit';

import  db  from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'

import dotenv from 'dotenv'


dotenv.config();
export async function PATCH(event) {
    const req = await event.request.json()
    const userid = req.userid
    const newuserid = req.newuserid
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'cart' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('cart', model);
    const rows = await newModel.findAll({ where: { userid: userid } })
    if (rows) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowModel = await Cmsmodel.findOne({ where: { models: 'cart' } })
            const model = sequelizer(rowModel.json_attr)
            const newModel = db.define('cart', model);
            await newModel.update({ userid: newuserid }, { where: { userid: userid } })

        }
    }
    return json({
        status: 'ok'
    });
    

}

export async function GET({url, cookies}) {
    const userid = url.searchParams.get('userid')? url.searchParams.get('userid') : cookies.get('userid');
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'cart' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('cart', model);
    if (!userid) {
        return json({
            cart: []
        });
    }
    const rows = await newModel.findAll({ where: { userid: userid } })
    if (rows) {
        let count = 0
        for (let i = 0; i < rows.length; i++) {
            
             if (!rows[i].count) {
                rows[i].count = 1
            
             }
            const row = rows[i];
            count = count + rows[i].count
        
        
        }
        return json({
           data:{
            rows: rows,
            count: count,
           },
           
        });
    }
    return json({
        cart: []
    });

}

export async function POST(event) {
    const rowsModel =  await Cmsmodel.findAll({where:{models:'cart'}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const cartModel = db.define('cart', model)

        const req = await event.request.json()
       
        try {
            const findModel = await cartModel.findOne({ where: { userid: req.userid, productid: req.productid } })
           
            if (findModel) {
           
                if (!findModel.count){
                    findModel.count = 1
                }
                let newcount = findModel.count + req.count
                
                const update = await cartModel.update({ count: newcount }, { where: { userid: req.userid, productid: req.productid } })
                return json({
                    status: 'ok',
                    update: update
                });
            } else {
                
                const create = await cartModel.create(req)
                return json({
                    status: 'ok',
                    create: create
                });
            }
        }catch (err) {
            return json({
                status: 'error',
                error: err
            });
        }



}

export async function DELETE(event) {
    const rowsModel =  await Cmsmodel.findAll({where:{models:'cart'}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const cartModel = db.define('cart', model)
    const req = await event.request.json()

   
     await cartModel.destroy({ where: { userid: req.userid, productid: req.id } })
    // получить текущую корзину
    const rows = await cartModel.findAll({ where: { userid: req.userid } })

    if (rows) {
        return json({
            data:{
                rows: rows,
                count: rows.length,
               },
        });
    }else {
        return json({
            data:{
                rows: [],
                count: 0,
               },
        });
    }
}
