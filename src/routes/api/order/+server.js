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
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'order' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('order', model);
    const rows = await newModel.findAll({ where: { userid: userid } })
    if (rows) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowModel = await Cmsmodel.findOne({ where: { models: 'order' } })
            const model = sequelizer(rowModel.json_attr)
            const newModel = db.define('order', model);
            await newModel.update({ userid: newuserid }, { where: { userid: userid } })

        }
    }
    return json({
        status: 'ok'
    });
    

}

export async function GET({url}) {
    const userid = url.searchParams.get('userid')
    const rowsModel = await Cmsmodel.findOne({ where: { models: 'order' } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define('order', model);
    // если userid не передан, то вернуть пустой массив
    if (!userid) {
        return json({
            cart: []
        });
    }
    const rows = await newModel.findAll({ where: { userid: userid } })
    if (rows) {
        return json({
            count: rows.length,
            cart: rows
        });
    }
    return json({
        cart: []
    });

}

export async function POST(event) {

    const req = await event.request.json()

    const rowsModel = await Cmsmodel.findOne({ where: { models: 'order' } })
    const model = sequelizer(rowsModel.json_attr)   
    const newModel = db.define('order', model);
    const rowsModelCart = await Cmsmodel.findOne({ where: { models: 'cart' } })
    const modelcart = sequelizer(rowsModelCart.json_attr)
    const newModelCart = db.define('cart', modelcart);
    //находим последний заказ c колонкой numberorder и увеличиваем на 1
    let numberOrder = 1
 
    const lastOrder = await newModel.findOne({ order: [['numberorder', 'ASC']] })

  
    if (lastOrder.dataValues.numberorder) {
        numberOrder = lastOrder.dataValues.numberorder + 1
    }
   // количество товаров в заказе cartcount 
    let cartcount = Number(req.cartcount)

    //создаем заказ сохраняя карточку товаров циклом for 
    for (let i = 0; i < cartcount; i++) {
        const cartid = 'cartid_'+[i] //id товара
        const cartqt = 'cartqt_'+[i] //количество товара
        const cartp = 'cartp_'+[i] //цена товара

        const product_id = req[cartid]//id товара

        const quantity = Number(req[cartqt]) //количество товара
        const price = Number(req[cartp]) //цена товара
        const user_id = req.userid //id пользователя
        const email = req.email //email пользователя
  
        const numberorder = Number(numberOrder) //номер заказа
        const status = 'new' //статус заказа
        // //создаем заказ
         const create = await newModel.create({ product_id: product_id, quantity: quantity, price: price, user_id: user_id, email: email, numberorder: numberorder, status: status })
        //удаляем товар из корзины по id товара и id пользователя userid
      
        await newModelCart.destroy({ where: { productid: product_id, userid: user_id } })


    }
    


    return json({
        status: 'ok',
        number: numberOrder

    });
   
}


  
