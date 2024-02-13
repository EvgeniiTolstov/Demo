
import { XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET({url}){


const urls = url.origin
const endpoint = `${urls}/api/v1/product_list?limit=10000`
const resProduct = await fetch(endpoint)
const data = await resProduct.json()

// удалить все товары с ценой 0 или пустой

for(let i = 0 ; i < data.data.rows.length; i++){
    if (data.data.rows[i].price === 0 || data.data.rows[i].price === null || data.data.rows[i].price === undefined) {
        //удаляем товар
        const res = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "id": data.data.rows[i].id
                }
            )
    
        })
          await res.json()
    }

}

return json({
    json: data.data.rows
})

}
