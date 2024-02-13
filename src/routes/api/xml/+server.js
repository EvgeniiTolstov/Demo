
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
    //console.log(`First book: `, json.catalog.book[0]);
    // вывести json на страницу
    const product = jsons.КоммерческаяИнформация.Каталог.Товары.Товар
    const delProduct = jsons.КоммерческаяИнформация.Каталог.Товары.Товар.Статус
    const section = jsons.КоммерческаяИнформация.Классификатор.Группы.Группа
    const urls = url.origin
    const endpoint = `${urls}/api/v3/product_list`
    const sectionSite = `${urls}/api/v3/section`
    let productList = `${urls}/api/v3/product_list?limit=2000`




    console.log('section.length', section.length)
    //сохраняем каждую секцию
    for (let i = 0; i < section.length; i++) {
        //     // найти секцию по артикулу в массиве sectiopnList
        const resSection = await fetch(`${sectionSite}?id1s=${section[i].Ид}`)
        const dataSection = await resSection.json()





        //     // если секция существует то пропускаем
        if (dataSection.data.count > 0) {

            //     //     // если секция существует то обновляем
            const res = await fetch(sectionSite, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${BEARER}`

                },
                body: JSON.stringify(
                    {
                        "id": dataSection.data.rows[0].id,
                        "title": section[i].Наименование,
                        "description": section[i].Наименование,
                        "id1s": section[i].Ид,
                    }
                )

            })


        }
        else {
    
            let slug = section[i].Наименование


        
            String.prototype.translit = String.prototype.translit || function () {
                var Chars = {
                    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'
                },
                    t = this;
                for (var i in Chars) { t = t.replace(new RegExp(i, 'g'), Chars[i]); }
                return t;
            };
  
            String.prototype.replaceSpace = String.prototype.replaceSpace || function () {
                var t = this;
                return t.replace(/\s/g, '-');
            };

            slug = slug.translit().replaceSpace()
            slug = slug.toLowerCase()

            const res = await fetch(sectionSite, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${BEARER}`
                },
                body: JSON.stringify(
                    {
                        "title": section[i].Наименование,
                        "id1s": section[i].Ид,
                        "slug": slug,
                        "description": section[i].Наименование,
                    }
                )

            })

            const data = await res.json()
   
        }

    }




    //сохраняем каждый товар 
    for (let i = 0; i < product.length; i++) {

        const resProduct = await fetch(`${endpoint}?article=${product[i].Артикул}`)
        const dataProduct = await resProduct.json()

        if (dataProduct.data.count > 0) {

            let image = product[i].Картинка
            if (image) {
                image = "webdata/" + product[i].Картинка
            } else {
                image = "noimage.jpg"
            }


            const res = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "id": dataProduct.data.rows[0].id,
                        "title": product[i].Наименование,
                        "description": product[i].Описание,
                        "section": slug,
                        "code": product[i].Артикул,
                        "image": image,
                    }
                )

            })


        } else {

            let image = product[i].Картинка
            if (image) {
                image = "webdata/" + product[i].Картинка
            } else {
                image = "noimage.jpg"
            }
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": product[i].Наименование,
                        'article': product[i].Артикул,
                        "description": product[i].Описание,
                        "section": product[i].Группы.Ид,
                        "image": image,
                        "code": product[i].Артикул,
                    }
                )

            })

            const data = await res.json()
            console.log('data', data)
        }

    }


    return json({
        json: "product"
    })

}

