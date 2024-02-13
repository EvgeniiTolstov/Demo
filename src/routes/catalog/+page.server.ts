
export async function load({url, cookies, fetch}){
    const endpoint = url.origin
    
    let limit: number = 10;
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
   
    let order_by = 'id';
    let getorder_by = url.searchParams.get('order_by');
    if (cookies.get('order_by') && cookies.get('order_by') !== 'null' && !getorder_by) {
        order_by = String(cookies.get('order_by'))
    }
    if (getorder_by) {
        order_by = getorder_by
        cookies.set('order_by', String(order_by), {path: '/'});
        
    }
    let order = 'ASC';
    let getorder = url.searchParams.get('order');
    if (cookies.get('order') && cookies.get('order') !== 'null' && !getorder) {
        order = String(cookies.get('order'))
    }
    if (getorder) {
        order = getorder
        cookies.set('order', String(order), {path: '/'});

    }
    let sort = `order_by=${order_by}&order=${order}`;

    async function getProducts(limit, offset, sort) {
        const products = `${endpoint}/api/v1/product_list?limit=${limit}&offset=${offset}&${sort}`
        const res = await fetch(products)
        const product = await res.json()
        const section = `${endpoint}/api/v1/section`
        const resSection = await fetch(section)
        const datasection = await resSection.json()
       // console.log('datasection', datasection)
         return {
            product: product,
            section: datasection
         }

        }
    return {
        products: getProducts(limit, offset, sort)
    }


}