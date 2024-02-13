
export async function load({fetch, params }) {
    const res = await fetch(`/api/v1/product_list/${params.product}`)
    const product = await res.json()
    const res2 = await fetch(`/api/v1/section?slug=${params.category}`)
    const category = await res2.json()
    return {
      productid : params.product,
      categoryslug : params.category,
      dataproduct : product.data,
      datacategory : category.data
    }
  }

