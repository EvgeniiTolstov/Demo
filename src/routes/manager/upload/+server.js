// эндпоинт загрузки файлов на сервер (принимает файлы в формате multipart/form-data) сохраняет файлы в папку uploads и возвращает ссылку на файл в формате json бибилиотека fs
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';


/** @type {import('./$types').RequestHandler} */

export async function POST({fetch, cookies, request}) {
    // проверка авторизации
    const token = cookies.get('token')
    const refresh_token = cookies.get('refresh_token')

    const formData = await request.formData();
    const file = formData.get('file');
    //string 
    const slug = String(formData.get('model'));

    const reader = file.stream().getReader();

    const buffer = await new Response(file).arrayBuffer();
    const array = new Uint8Array(buffer);
    const blob = new Blob([array]);
    const urlSlug = URL.createObjectURL(blob);
    const filename = file.name;
    const filesavedb = `/api/v1/file`

    const pathfile = path.join(
      process.cwd(),
      'static',
      'upload',
      slug,
        );
      
    if (!fs.existsSync(pathfile)) {
      fs.mkdirSync(pathfile);
    }
    if (!fs.existsSync(`${pathfile}/${filename}`)) {
      const response = await fetch(filesavedb, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filename: filename,
            folder: slug,
            url: "upload/"+slug+"/"+filename
        })
    })
     

 await response.json()
    }

    console.log("pathfile",pathfile)

    fs.writeFileSync(`${pathfile}/${filename}`, array);
    return json({ url: pathfile });

}


