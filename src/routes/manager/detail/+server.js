import db from "$lib/db.js"
import { json } from "@sveltejs/kit"

import { sequelizer } from '$lib/json-sequelize'
import Cmsmodel from "$lib/models/Cmsmodel.js"
export async function POST(event) {

    const req = await event.request.json()
    let rowsModel = await Cmsmodel.findOne({ where: { models: req.model } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define(req.model, model);

    try {
        const createModel = await newModel.create(req.properties);
        return json({
            data: createModel
        });
    } catch (error) {
        return json({
            data: error.errors[0].message
        });
    }

}

export async function PUT(event) {

    const req = await event.request.json()
    let rowsModel = await Cmsmodel.findOne({ where: { models: req.model } })
    const model = sequelizer(rowsModel.json_attr)
    const newModel = db.define(req.model, model);
    const jane = await newModel.create(req.properties);
    return json({
        data: jane
    });

}