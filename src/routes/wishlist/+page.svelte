<script>
  import {Countcart} from '$lib/stores.js';
  export let data 
 let summ = data.summ
  
  //console.log("data111111", data) 

  async function addToCart(id=0) {
   const userid = localStorage.getItem('userid');
   const response = await fetch('/api/cart', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       productid: id,
       userid: userid,
       count: 1
     })
   });
   const data = await response.json();
   console.log(data)
   // если ответ 200 то добавить в корзину
   if (response.status == 200) {
     Countcart.update(n => n + 1);
   } else {
     alert('Ошибка')
 
   }
   
 }

  const removeFromCart = async (id) => {
    const userid = localStorage.getItem('userid');
    const res = await fetch(`/api/wishlist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productid: id,
        userid: userid

      })
    });
    const data = await res.json();
    console.log(data)
    if (res.status == 200) {
      location.reload();
    } else {
      alert('Ошибка')
    }
  }

</script>

<section class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <div class="p-12 lg:p-20 bg-white">
        <h2 class="mb-20 text-5xl font-bold font-heading">Избранное
        </h2>
        <div class="flex flex-wrap items-center -mx-12">
          <div class="w-full xl:w-12/12 mb-8 xl:mb-0 px-4">
            <div class="hidden lg:flex w-full">
              <div class="w-full lg:w-3/12">
                <h4 class="mb-6 font-bold font-heading text-gray-500">Фото</h4>
              </div>
              <div class="w-full lg:w-6/12">
                <h4 class="mb-6 font-bold font-heading text-gray-500">Наименование</h4>
              </div>
              <div class="w-full lg:w-2/12">
                <h4 class="mb-6 font-bold font-heading text-gray-500">Цена</h4>
              </div>
              <div class="w-full lg:w-3/12 text-center">
                <h4 class="mb-6 font-bold font-heading text-gray-500">В корзину</h4>
              </div>
              <div class="w-full lg:w-2/12 text-center">
                <h4 class="mb-6 font-bold font-heading text-gray-500">Удалить</h4>
              </div>
            </div>
           
            

            <div class="mb-12 py-6 border-t border-b border-gray-200">
              {#each data.cartProduct as item  }
          
              <div  class="flex flex-wrap items-center -mx-4">
                <div class="w-full md:w-4/6 lg:w-6/12 px-4 mb-6 md:mb-0">
                  <div class="flex -mx-4 flex-wrap items-center">
                    <div class="w-full md:w-1/3 px-4 mb-3">
                      <div class="flex items-center justify-center w-full md:w-24 h-32 bg-gray-100">
                        <img class="h-full object-contain"   src="/api/files/read?folder=/&file={item.image}" alt="{item.title}">
                      </div>
                    </div>
                    <div class="w-full md:w-2/3 px-4">
                      <h3 class="mb-2 text-xl font-bold font-heading">  {item.title}</h3>
                      <!-- <p class="text-gray-500">Lorem ipsum dolor L</p> -->
                    </div>
                  </div>
                </div>
                <div class="hidden lg:block lg:w-2/12 px-4">
                  {#if item.price > 0}
                  <p class="text-lg text-blue-500 font-bold font-heading">{item.price}</p>
                  {:else}
                  <p class="text-lg text-blue-500 font-bold font-heading">не указана</p>

                  {/if}
                  <!-- <span class="text-xs text-gray-500 line-through">$33.69</span> -->
                </div>
                <div class="w-auto md:w-1/6 lg:w-2/12 px-4">
                  <button on:click={() => addToCart(item.id)} class="mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"></path>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg>                  
                   </button>
                </div>
                <div class="w-auto md:w-1/6 lg:w-2/12 px-4 items-center" >
                 <button on:click={() => removeFromCart(item.id)} class="items-center mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M.5 1a.5.5 0 0 1 .5.5v.586l1.854 7.417A2 2 0 0 0 4.263 12h7.474a2 2 0 0 0 1.91-1.497l1.5-8A2 2 0 0 0 13.737 1H4.263a2 2 0 0 0-1.91 1.503L.5 1.586V1.5z"></path>
                      <path fill-rule="evenodd" d="M4.5 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zM13 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>                  
                   </button>
                </div>
              </div>
              {/each}

            </div>
            <!-- <div class="flex flex-wrap items-center lg:-mb-4">
              <span class="mr-12 mb-4 font-medium">Apply discount code:</span>
              <input class="flex-1 md:flex-none mr-6 sm:mr-0 md:mr-6 mb-4 px-8 py-4 placeholder-gray-800 font-bold font-heading border rounded-md" type="text" placeholder="SUMMER30X">
              <a class="flex-1 md:flex-none inline-block mb-4 px-8 py-4 text-center text-white font-bold font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md" href="#">Apply</a>
            </div> -->
          </div>

        </div>
      </div>
    </div>
  </section>