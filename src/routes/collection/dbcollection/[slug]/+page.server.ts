
import db from '$lib/db.js';
import {sequelizer} from '$lib/json-sequelize.js'
import Cmsmodel from "$lib/models/Cmsmodel.js"




export async function load({ url, params }) {
        let limit = url.searchParams.get('limit') || 10
        let offset = url.searchParams.get('offset') || 0
        let id:number = url.searchParams.get('id') || 0
        const rowsModel =  await Cmsmodel.findOne({where:{models:"db_collection"}})
        const attribute = rowsModel.json_attr
    
     let type = Object.values(attribute.properties)
        const model = sequelizer(attribute)
        const urlmodel = "db_collection"
        let myData = db.define(urlmodel, model)
        const rows1 =  await myData.findOne({where:{name_collection:params.slug}})
        const dbcollection = rows1.db_collection;
        const rows2 =  await Cmsmodel.findOne({where:{models:dbcollection}})
        const attribute2 = rows2.json_attr
        const model2 = sequelizer(attribute2)
        const urlmodel2 = dbcollection
        let myData2 = db.define(urlmodel2, model2)
        const rowsModel3 =  await Cmsmodel.findOne({where:{models:"db_collection_child_collection"}})
        const attribute3 = rowsModel3.json_attr
        const model3 = sequelizer(attribute3)
        const urlmodel3 = "db_collection_child_collection"
        let myData3 = db.define(urlmodel3, model3)
        const rows3 =  await myData3.findAll({where:{db_collection:params.slug}})
       const rowsModel6 =  await Cmsmodel.findOne({where:{models:"child_collection"}})
        const attribute6 = rowsModel6.json_attr
        const model6 = sequelizer(attribute6)
        const urlmodel6 = "child_collection"
        let myData6 = db.define(urlmodel6, model6)
        const rows6 =  await myData6.findAll({where:{id_row:id}})


      let child_collections = []
      for (let i = 0; i < rows3.length; i++) {
        const element = rows3[i].child_collection;
        const rows4 =  await Cmsmodel.findOne({where:{models:element}})
      for (let is = 0; is < rows6.length; is++) {
      
        const elementchild = rows6[is].id_child;

            const attribute4 = rows4.json_attr
            const model4 = sequelizer(attribute4)
            const urlmodel4 = element
            let myData4 = db.define(urlmodel4, model4)
            const rows5 =  await myData4.findAll({where:{id:elementchild}})
    
            child_collections.push(rows5)
        }
    }

        
        const rows =  await myData2.findAndCountAll({limit:limit,offset:offset})
        let newData = JSON.stringify(rows)
        let jsonAttrebutes = JSON.stringify(attribute2)

     let rowdata = ''
   
     if (id>0){
        const rowsdata =  await myData2.findOne({where:{id:id}})
        rowdata = JSON.stringify(rowsdata) 
        
    }else {
        rowdata = JSON.stringify({})
    }

    child_collections = JSON.stringify(child_collections);
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
            },
            child_collections
            
           
           
        }
    }

   