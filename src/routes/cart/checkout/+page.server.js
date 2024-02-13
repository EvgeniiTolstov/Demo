
export async function load({ fetch, cookies }) {
    let userid = cookies.get('userid')
      const getcart = await fetch(`/api/v1/cart?userid=${userid}`)
        const cart = await getcart.json().then((data) => {
            return data
        })
    let cartlrow = cart.data.rows
    let cartProduct = []
    let summ = 0
    for (let i = 0; i < cartlrow.length; i++) {
        const getproduct = await fetch(`/api/v1/product_list?id=${cartlrow[i].productid}`)
        const productdata = await getproduct.json().then((data) => {
            return data
        }
        )
        cartProduct.push(productdata.data.rows[0])
        cartProduct[i].quantity = cartlrow[i].count
        summ = summ + cartProduct[i].price * cartProduct[i].quantity
    
    }   
    return {
        cartProduct: cartProduct,
        summ: summ
    }
      
    }


    /** @type {import('./$types').Actions} */
export const actions = {
    order: async ({ cookies, request, fetch }) => {
        // TODO log the user in
       
        const data = await request.formData();
        //переслать все данные из data на сервер
        const form = {};
        for (const [key, value] of data.entries()) {
            form[key] = value;
        }
        form.userid = cookies.get('userid')
        
        // отправить данные на сервер
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
         await response.json();
        //console.log('json', json)
       
        return {  success: true }
    }
}



    
