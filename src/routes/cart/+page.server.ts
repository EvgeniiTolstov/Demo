
export async function load({ fetch, cookies }) {
let userid = cookies.get('userid')
  const getcart = await fetch(`/api/cart?userid=${userid}`)
    const cart = await getcart.json().then((data) => {
        return data
    })
let cartlrow = cart.data.rows

let summ = 0

let idproduct = []
let idproductstr = ''

let cartSumm = 0

if (cartlrow.length === 0) {

    return {
        cartProduct: [],
        summ: 0
    }

}
for (let i = 0; i < cartlrow.length; i++) {
    idproduct.push(cartlrow[i].productid)

    cartSumm = cartSumm + cartlrow[i].price * cartlrow[i].count
    
    idproductstr = idproductstr + `&id[]=${cartlrow[i].productid}`


}


let url = `/api/v2/product_list?${idproductstr}&limit=1000`;

const getproduct = await fetch(`${url}`)

const product = await getproduct.json().then((data) => {
    return data
})

for (let i = 0; i < product.data.rows.length; i++) {
    for (let j = 0; j < cartlrow.length; j++) {
        if (product.data.rows[i].id == cartlrow[j].productid) {
            product.data.rows[i].quantity = cartlrow[j].count
        }
    }
}

return {
    cartProduct: product.data.rows,
    summ: cartSumm
}
  
}