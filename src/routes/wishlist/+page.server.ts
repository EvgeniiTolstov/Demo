
export async function load({ fetch, cookies }) {
let userid = cookies.get('userid')
  const getcart = await fetch(`/api/wishlist?userid=${userid}`)
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