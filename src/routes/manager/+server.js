import { json } from '@sveltejs/kit';
import {DataTypes,Sequelize, Model, QueryInterface} from 'sequelize';
import db from '$lib/db.js';
import {sequelizer} from '$lib/json-sequelize'
import Cmsmodel from '$lib/models/Cmsmodel.js';



export async function POST(event) {
     
    //1 прочитаем пост запрос
    const req = await event.request.json()
    // 2 проверм существует ли модель в бд
    let rowsModel =  await Cmsmodel.findOne({where:{models:req.model}})
    if (!rowsModel){
        // 3 сохраним модель
       await Cmsmodel.create({ json_attr: JSON.stringify(req),models:req.model  });

    }else{
        return json( {
            body:"Модель уже существует"
        })
    }
   

    const model = sequelizer(req)

    const createmodel = db.define(req.model, model)
    await createmodel.sync();

    return json({
        data: req
    });
}

export async function PATCH(event) {
   // console.log('event',event)
    const req = await event.request.json()
    const model = sequelizer(req)
    const createmodel = db.define(req.model, model)

   // await createmodel.sync();

        await  createmodel.sync({ alter: true }) // обновить
         console.log('update')
       //  let rowsModel = await Cmsmodel.findOne({ where: { models: req.model } })

         //const newModel = db.define(req.model, model);

             // 3 сохраним модель
            await Cmsmodel.update({ json_attr: JSON.stringify(req),models:req.model },{where:{models:req.model}});
     
         

    return json({
        body: req
    });
}

export async function PUT(event) {
     const req = await event.request.json()

     const model = sequelizer(req)
     console.log(model);
     const createmodel = db.define(req.model, model)
           createmodel.sync({ force: true }) // пересоздать
          console.log('recreate')
          await Cmsmodel.update({ json_attr: JSON.stringify(req),models:req.model },{where:{models:req.model}});

     return json({
         body: req
     });
 }

export async function DELETE(event) {
const req = await event.request.json()
const rowsModel = await Cmsmodel.findOne({ where: { models: req.model } })

console.log('rowsModel',req.model);
    if (rowsModel){

        const modelnames = req.model+'s';
        const modelname = req.model;
     
        await Cmsmodel.destroy({where:{models:req.model}});
        await db.query(`DROP TABLE ${modelnames}`);
        await db.query(`DROP TABLE ${modelname}`);

    }else{
        return json({
            body: "Модель не найдена"
        })
    }
    return json({
        body: req
    });

}