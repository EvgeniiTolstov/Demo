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
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'wishlist' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('wishlist', model);
    const rows = await newModel.findAll({ where: { userid: userid } })
    if (rows) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowModel = await Cmsmodel.findOne({ where: { models: 'wishlist' } })
            const model = sequelizer(rowModel.json_attr)
            const newModel = db.define('wishlist', model);
            await newModel.update({ userid: newuserid }, { where: { userid: userid } })

        }
    }
    return json({
        status: 'ok'
    });

}

export async function GET({url}) {
    const userid = url.searchParams.get('userid')
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'wishlist' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('wishlist', model);

    if (!userid) {
        return json({
            wishlist: []
        });
    }
    const rows = await newModel.findAll({ where: { userid: userid } })
    if (rows) {
        return json({
            data:{
                rows: rows,
                count: rows.length,
               },
        });
    }else{
        return json({
            data:{
                rows: [],
                count: 0,
               },
        });
    }

}

export async function POST(event) {
    const rowsModel =  await Cmsmodel.findAll({where:{models:'wishlist'}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const wishlistrtModel = db.define('wishlist', model)

        //проверка на существование
        const req = await event.request.json()
       
       
        try {
            const findModel = await wishlistrtModel.findOne({ where: { userid: req.userid, productid: req.productid } })
           
            if (findModel) {
                console.log('update')
                let newcount = findModel.count + req.count
                const update = await wishlistrtModel.update({ count: newcount }, { where: { userid: req.userid, productid: req.productid } })
                return json({
                    status: 'ok',
                    update: update
                });
            } else {
                console.log('create')
                const create = await wishlistrtModel.create(req)
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
    const rowsModel =  await Cmsmodel.findAll({where:{models:'wishlist'}})
    const attribute = rowsModel[0].json_attr
    const model = sequelizer(attribute)
    const wishlistrtModel = db.define('wishlist', model)
    const req = await event.request.json()
    const userid = req.userid
    const productid = req.productid
    const rows = await wishlistrtModel.destroy({ where: { userid: userid, productid: productid } })
    return json({
        status: 'ok'
    });
}