import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';



export async function POST({fetch,cookies, request, url}) {
    const token = cookies.get('token')
    const refresh_token = cookies.get('refresh_token')


    const formData = await request.formData();
    const file = formData.get('file');
    const slug = String(formData.get('model'));
   
    const reader = file.stream().getReader();

    const buffer = await new Response(file).arrayBuffer();
    const array = new Uint8Array(buffer);
    const blob = new Blob([array]);
    const urlSlug = URL.createObjectURL(blob);
    let filename = file.name;
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

    fs.writeFileSync(`${pathfile}/${filename}`, array);
    return json({ url: pathfile });

}


