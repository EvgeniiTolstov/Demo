import Cmsmodel from "$lib/models/Cmsmodel.js"


export  async function load({params}){

    let rowsModel =  await Cmsmodel.findOne({where:{models:params.slug}})

    let models = await rowsModel.json_attr

    return {
        data: models
    }

}