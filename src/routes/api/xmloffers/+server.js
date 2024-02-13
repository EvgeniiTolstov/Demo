
import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv'
dotenv.config();
export async function GET({url}){
    const BEARER =  process.env.BEARER
const pathfile = path.join(
    process.cwd(),
    'static',
    'webdata',
      );
      const xmlFile = readFileSync(`${pathfile}/offers0_1.xml`, 'utf8');   


      
const parser = new XMLParser();
const jsons = parser.parse(xmlFile);

await jsons

const product = jsons.КоммерческаяИнформация.ПакетПредложений.Предложения.Предложение
const urls = url.origin
const endpoint = `${urls}/api/v3/product_list`


for(let i = 0 ; i < product.length; i++){

    const resProduct = await fetch(`${endpoint}?article=${product[i].Артикул}`)
    const dataProduct = await resProduct.json()

    if(dataProduct.data.count > 0){
        let price = product[i].Цены.Цена.ЦенаЗаЕдиницу
        let count = product[i].Количество
        price = price + (price * 0.2)

        if (price === 0 || count === 0 ) {

            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${BEARER}`
                },
                body: JSON.stringify(
                    {
                        "id": dataProduct.data.rows[0].id
                    }
                )
        
            })
              await res.json()
        }else{
        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${BEARER}`
            },
            body: JSON.stringify(
                {
                    "id": dataProduct.data.rows[0].id,
                    "price": price,
                }
            )
    
        })
       await res.json()
    }
    } else {

    }

}

return json({
    json: product
})

}