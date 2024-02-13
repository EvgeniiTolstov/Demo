// @ts-nocheck
import { json } from '@sveltejs/kit';
import db from '$lib/db.js';
import {sequelizer} from '$lib/json-sequelize'
import Cmsmodel from "$lib/models/Cmsmodel.js"


/** @type {import('./$types').RequestHandler} */
export async function GET( {request, params}) {
     let rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
     let attribute = rowsModel[0].json_attr
     const model = sequelizer(attribute)
     const urlmodel = params.slug

     const allmodel = db.define(urlmodel, model)
     let rows =  await allmodel.findOne({where:{id:params.id}})
     return json({
         data:(rows)
     })
 }
 
    /** @type {import('./$types').RequestHandler} */
    export async function POST( {request, params}) {
        let rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
        let attribute = rowsModel[0].json_attr
        const model = sequelizer(attribute)
        const urlmodel = params.slug
        const allmodel = db.define(urlmodel, model)
        let rows =  await allmodel.create(request.body)
        return json({
            data:(rows)
        })
    }

    /** @type {import('./$types').RequestHandler} */
    export async function PUT( {request, params}) {
        let rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
        let attribute = rowsModel[0].json_attr
        const model = sequelizer(attribute)
        const urlmodel = params.slug
        const allmodel = db.define(urlmodel, model)
        let rows =  await allmodel.update(request.body,{where:{id:params.id}})
        return json({
            data:(rows)
        })
    }

    /** @type {import('./$types').RequestHandler} */
    export async function DELETE( {request, params}) {
        let rowsModel =  await Cmsmodel.findAll({where:{models:params.slug}})
        let attribute = rowsModel[0].json_attr
        const model = sequelizer(attribute)
        const urlmodel = params.slug
        const allmodel = db.define(urlmodel, model)
        let rows =  await allmodel.destroy({where:{id:params.id}})
        return json({
            data:(rows)
        })
    }
    