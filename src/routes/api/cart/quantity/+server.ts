import { json } from '@sveltejs/kit';
import  db  from '$lib/db.js';
import Cmsmodel from "$lib/models/Cmsmodel.js"
import { sequelizer } from '$lib/json-sequelize'
export async function POST(event){
    const rowsModel:any =  await Cmsmodel.findAll({where:{models:'cart'}})
    const attribute:any = rowsModel[0].json_attr
    const model:any = sequelizer(attribute)
    const cartModel:any = db.define('cart', model)
    const req = await event.request.json()
    const productid = req.id
    const {id, quantity, userid} = req
    const cart = await cartModel.findOne({where:{productid, userid}})
    cart.count =  cart.count + quantity
    await cart.save()

return json({id, quantity})
   
}