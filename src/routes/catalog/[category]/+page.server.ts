
export async function load({url, params, cookies, fetch}){
    console.log('url', url)
    const endpoint = url.origin
    const {category} = params
    console.log('category', category)

    // проверить существует ли в куках limit
    let limit = 10;
    let getlimit = Number(url.searchParams.get('limit'));
    if (cookies.get('limit') && cookies.get('limit') !== 'null' && !getlimit) {
        limit = Number(cookies.get('limit'))
    }

    if (getlimit) {
        limit = getlimit
        cookies.set('limit', String(limit), {path: '/'});
    }
    let offset = 0;
    let getoffset = Number(url.searchParams.get('offset'));
    if (cookies.get('offset') && cookies.get('offset') !== 'null' && !getoffset) {
        offset = Number(cookies.get('offset'))
    }
 
    if (getoffset || getoffset==0) {
        offset = getoffset
        cookies.set('offset', String(offset), {path: '/'});
    }
   
    let order_by = (cookies.get('order_by') && cookies.get('order_by') !== 'null') ? cookies.get('order_by') : 'id';
    let getorder_by = url.searchParams.get('order_by') ? url.searchParams.get('order_by') : 'id';
    if (getorder_by) {
        order_by = getorder_by
        cookies.set('order_by', String(order_by), {path: '/'});
        
    }
    let order = (cookies.get('order') && cookies.get('order') !== 'null') ? cookies.get('order') : 'ASC';
    let getorder = url.searchParams.get('order') ? url.searchParams.get('order') : 'ASC';
    if (getorder) {
        order = getorder
        cookies.set('order', String(order), {path: '/'});

    }

     let sort = `order_by=${order_by}&order=${order}`
  
 
         const products = `${endpoint}/api/v1/product_list?section=${category}&limit=${limit}&offset=${offset}&${sort}`
         console.log('products', products)
      
            const res = await fetch(products)
            const product = await res.json()
            console.log('product', product)
      
     
            const section = `${endpoint}/api/v1/section`
            const resSection = await fetch(section)
            const datasection = await resSection.json()
            const searchSection = section+'?slug='+category
             const resSearchSection = await fetch(searchSection)
             const dataSearchSection = await resSearchSection.json()
             const titleSection = dataSearchSection.title
         return {
            products:{
                    product: product,
                    section: datasection,
                    openslug: category,
                     titleSection: dataSearchSection
                }
         }


}