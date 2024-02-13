
import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv'
dotenv.config();
export async function GET({ url, fetch }) {

    const pathfile = path.join(
        process.cwd(),
        'static',
        'webdata',
    );
    const xmlFile = readFileSync(`${pathfile}/import0_1.xml`, 'utf8');


    const parser = new XMLParser();
    const jsons = parser.parse(xmlFile);
    const BEARER = process.env.BEARER

    await jsons

    const product = jsons.КоммерческаяИнформация.Каталог.Товары.Товар
    const delProduct = jsons.КоммерческаяИнформация.Каталог.Товары.Товар.Статус
    const section = jsons.КоммерческаяИнформация.Классификатор.Группы.Группа
    const urls = url.origin
    const endpoint = `${urls}/api/v3/product_list`
    const sectionSite = `${urls}/api/v3/section`
    let productList = `${urls}/api/v3/product_list?limit=2000`


    for (let i = 0; i < delProduct.length; i++) {

        const resProduct = await fetch(`${endpoint}?article=${delProduct[i].Артикул}`)
        const dataProduct = await resProduct.json()

        if (dataProduct.data.count > 0) {
            const res = await fetch(`${endpoint}/${dataProduct.data.rows[0].id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${BEARER}`

                },
                body: JSON.stringify(
                    {
                        "id": dataProduct.data.rows[0].id,
                    }
                )

            })


        } else {
            console.log('нет товара')
        }

       
    }
     const resProductList = await fetch(productList)
     const dataProductList = await resProductList.json()
     console.log('dataProductList', dataProductList)
     for (let i = 0; i < dataProductList.data.rows.length; i++) {
         let findProduct = false
         for (let j = 0; j < product.length; j++) {
             if (dataProductList.data.rows[i].article === product[j].Артикул) {
                 findProduct = true
             }
         }
         if (!findProduct) {
             const res = await fetch(endpoint, {
                 method: 'DELETE',
                 headers: {
                     'Content-Type': 'application/json',
                     "Authorization": `Bearer ${BEARER}`

                 },
                 body: JSON.stringify(
                     {
                         "id": dataProductList.data.rows[i].id,
                     }
                 )

             })
             await res.json()
         }
     }




     return json({
         json: "delete"
     })

}

