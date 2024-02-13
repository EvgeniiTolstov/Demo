import fs from 'fs'
import sharp from 'sharp'
import path from 'path'
export async function GET({ url }){
  var name = String(url.searchParams.get('file')) ?? ''
    var folder = url.searchParams.get('folder') ?? ''

  const width = Number(url.searchParams.get('width') ?? '0');
  const height = Number(url.searchParams.get('height') ?? '0');
    const file = path.join(
    process.cwd(),
    'static',
    'upload',
    folder,
    name
    )
  //если указаны ширина и высота то обрезаем изображение иначе просто отдаем
  if (width > 0 && height > 0) {
    const data = await sharp(`${file}`)
      .resize(width, height)
      .toBuffer()
    return new Response(await data)
  } else {
    const data = await fs.promises.readFile(`${file}`)
  return new Response(await data)
  }
  

}


