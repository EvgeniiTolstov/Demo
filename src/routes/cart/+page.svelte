<script>
  import {Countcart, Countwishlist} from '$lib/stores.js';
  export let data 
  
  console.log('product',data)
 let summ = data.summ
  let userid = data.userid_cookies
  console.log('userid',userid)
  async function pluse(id){
    console.log(id)
    let quantity = 1
    let response = await fetch('/api/cart/quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, quantity, userid})
    });
    let result = await response.json();
    if(result.status == 'ok'){
      data.cartProduct = result.data
      summ = result.summ
    }
  }
  async function minuse(id){
    let quantity = -1
    console.log(id)
    let response = await fetch('/api/cart/quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, quantity, userid})
    });
    let result = await response.json();
    if(result.status == 'ok'){
      data.cartProduct = result.data
      summ = result.summ
    }
  }
  async function deleteProduct(id){
    console.log(id)
    let response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, userid})
    });
    let result = await response.json();
    $: Countcart.set(result.data.count)
    console.log('result.count',result.data.count)
    if(result.data.count){
     
       location.reload()
    }else{
      data.cartProduct = []
      summ = 0
      location.reload()
    
    }
  }
  

 
</script>

<section class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="p-8 lg:p-20 bg-white">
        <h2 class="mb-20 text-5xl font-bold font-heading">Ваша корзина
        </h2>
        <div class="flex flex-wrap items-center -mx-4">
          <div class="w-full xl:w-8/12 mb-8 xl:mb-0 px-4">
    
           
            

            <div class="mb-12 py-6 border-t border-b border-gray-200">
            

          
              {#each  data.cartProduct as item  }
              
          
              <div  class="flex flex-wrap items-center -mx-4">
                <div class="w-full md:w-4/6 lg:w-4/12 px-4 mb-6 md:mb-0">
                  <div class="flex -mx-4 flex-wrap items-center">
                    <div class="w-full md:w-1/3 px-4 mb-3">
                      <div class="flex items-center justify-center w-full md:w-24 h-32 bg-gray-100">
                        <img class="h-full object-contain"   src="/api/files/read?folder=/&file={item.image}" alt="{item.title}">
                      </div>
                    </div>
                    <div class="w-full md:w-2/3 px-4">
                      <h3 class="mb-2 text-l font-bold font-heading">  {item.title}</h3>
                      {item.article}
                      <!-- <p class="text-gray-500">Lorem ipsum dolor L</p> -->
                    </div>
                  </div>
                </div>
                <div class="hidden lg:block lg:w-2/12 px-4">
                  {#if item.price > 0}
                  <p class="text-m text-blue-500 font-bold font-heading">{item.price}</p>
                  {:else}
                  <p class="text-s text-blue-500  ">Цена будет указана при формировании счета</p>
                  {/if}
                  <!-- <span class="text-xs text-gray-500 line-through">$33.69</span> -->
                </div>
                <div class="w-auto md:w-1/6 lg:w-2/12 px-4">
                  <div class="inline-flex items-center px-4 font-semibold font-heading text-gray-500 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md">
                    <button on:click={() => minuse(item.id)}  on:click={() => item.quantity--}  class="py-2 hover:text-gray-700">
                      <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.35"><rect x="12" width="2" height="12" transform="rotate(90 12 0)" fill="currentColor"></rect></g></svg>
                    </button>
                    <input class="w-12 m-0 px-2 py-4 text-center md:text-center border-0 focus:ring-transparent focus:outline-none rounded-md" type="text" placeholder="{item.quantity}">
                    <button  on:click={() => pluse(item.id)}  on:click={() => item.quantity++} class="py-2 hover:text-gray-700">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.35"><rect x="5" width="2" height="12" fill="currentColor"></rect><rect x="12" y="5" width="2" height="12" transform="rotate(90 12 5)" fill="currentColor"></rect></g></svg>
                    </button>
                  </div>
                </div>
                <div class="w-auto md:w-1/6 lg:w-2/12 px-4 text-right">
                  {#if item.price > 0}
                  <p class="text-lg text-blue-500 font-bold font-heading">{(item.quantity * item.price).toFixed(2)}</p>
                  {:else}
                  <p class="text-lg text-blue-500 font-bold font-heading"></p>
                  {/if}
                </div>
                <div class="w-auto md:w-1/6 lg:w-2/12 px-4 text-right">
                  <button on:click={() => deleteProduct(item.id)} class="text-gray-500 hover:text-gray-700">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.35"><path d="M6 6L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 6L6 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                    Удалить
                  </button>
                        
              </div>
              </div>
              {/each}

            </div>

          </div>
          <div class="w-full xl:w-4/12 px-4">
            <div class="p-6 md:p-12 bg-blue-300">
              <h2 class="mb-6 text-xl font-bold font-heading text-white">Итого</h2>
            
            
            
              <div class="flex mb-10 justify-between items-center">
                {#if summ > 0}
                <span class="text-xl font-bold font-heading text-white">Сумма</span>
                <span class="text-xl font-bold font-heading text-white">{summ}    </span>
                {:else}
                <span class="text-xl font-bold font-heading text-white"></span>
                {/if}
                
            
              </div>
              <a class="block w-full py-4 bg-orange-300 hover:bg-orange-400 text-center text-white font-bold font-heading uppercase rounded-md transition duration-200" href="cart/checkout/">Оформить заказ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
