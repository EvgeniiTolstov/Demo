import Cmsmodel from "$lib/models/Cmsmodel.js"
import {json} from "sequelize"


// @ts-ignore
export  async function load(){
    //const models = sequelizer(rowsModel.json_attr)
    let rowsModel =  await Cmsmodel.findAll()
  //  console.log('rowsModel' , rowsModel)
    // @ts-ignore
    //
    let models = await JSON.parse(JSON.stringify(rowsModel))
     console.log(Object.values(models))

    // slug: params.params.slug
    // return json({
    //     mdata: rowsModel
    // })
    return {
            mdata: models
      }

}


