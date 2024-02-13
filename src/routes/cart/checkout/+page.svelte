<script>
  import { goto } from '$app/navigation';

    export let data 
    export let form
    console.log("form", data.findUser)
 
   let summ = data.summ
    let i = 0
  //  console.log("data", data) 
  //  let neme = ''
  //  let inn = ''
  //  let email = ''
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
 
  if (form?.success) {
    setTimeout(() => {
      goto('/ca')
    }, 2000)
  }
   
  </script>
  
  {#if form?.success}

   <p>Successfully logged in! Welcome back</p>
{/if}
  <form method="POST" action="?/order" > 
  <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="p-8 lg:p-20 bg-white">
          <h2 class="mb-20 text-5xl font-bold font-heading">Оформление заказа
          </h2>
          <div class="flex flex-wrap items-center -mx-4">
            <div class="w-full xl:w-12/12 mb-8 xl:mb-0 px-4">
          
             

              <div class="mb-12 py-6 border-t border-b border-gray-200">
                {#each data.cartProduct as item, i}
                
            <input type="hidden" name="cartid_{i}" value="{item.id}">
            <input type="hidden" name="cartqt_{i}" value="{item.quantity}">
            <input type="hidden" name="cartp_{i}" value="{item.price}">

                <div  class="flex flex-wrap items-center -mx-4">
                  <div class="w-full md:w-4/6 lg:w-6/12 px-4 mb-6 md:mb-0">
                    <div class="flex -mx-4 flex-wrap items-center">
                      <div class="w-full md:w-1/3 px-4 mb-3">
                        <div class="flex items-center justify-center w-full md:w-24 h-32 bg-gray-100">
                          <img class="h-full object-contain" src="/api/files/read?folder=/&file={item.image}" alt="{item.title}">
                          
                        </div>
                      </div>

                      <div class="w-full md:w-2/3 px-4">
                        <h3 class="mb-2 text-xl font-bold font-heading">  {item.title}</h3>
                        <!-- <p class="text-gray-500">Lorem ipsum dolor L</p> -->
                      </div>
                    </div>
                  </div>
                  <div class="hidden lg:block lg:w-2/12 px-4">
                    <p class="text-lg text-blue-500 font-bold font-heading">{item.price}</p>
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
                    <p class="text-lg text-blue-500 font-bold font-heading">{item.quantity * item.price }</p>
                  </div>
                </div>
             
                {/each}
               Колличество товаров: {data.cartProduct.length}
               <input type="hidden" name="cartcount" value="{data.cartProduct.length}">
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

        <div class="container mx-auto px-4">
        <div class="p-8 lg:p-20 bg-white">

          <div class="flex flex-wrap -mx-4">
            <div class="w-full xl:w-2/3 px-4">
            
                <div class="flex flex-wrap -mx-8">
                  <div class="w-full md:w-1/2 py-4 px-8 mb-4 md:mb-0">
                    <div class="mb-10 ">
                      <label class="font-bold font-heading text-gray-600" for="" contenteditable="false">Имя</label>
                      <input name="name" class="block w-full mt-4 py-4 px-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"  type="text" value="{data.findUser.name?data.findUser.name:''}" >
         
                    </div>

                  </div>
                  <div class="w-full md:w-1/2 py-4 px-8 mb-4 md:mb-0">
                    <div class="mb-10 ">
                      <label class="font-bold font-heading text-gray-600" for="" contenteditable="false">ИНН компании</label>
                      <input class="block w-full mt-4 py-4 px-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"  type="text" value="{data.findUser.inn?data.findUser.inn:""}" ></div>
                  </div>
                </div>
      
                <div class="flex flex-wrap -mx-8">
                  <div class="w-full md:w-1/2 py-4 px-8 mb-4 md:mb-0">
                    <div class="mb-10 ">
                      <label class="font-bold font-heading text-gray-600" for="" contenteditable="false">Телефон</label>
                      <div class="mt-4 flex items-center rounded-md">
                        <span class="self-stretch px-6 border border-r-0 rounded-l-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone h-full" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                          </svg></span>
                        <input class="block w-full py-4 px-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-r-md" type="text" value="{data.findUser.phone?data.findUser.phone:""}"></div>                  
                    </div>
                  </div>
                  <div class="w-full md:w-1/2 py-4 px-8 mb-4 md:mb-0">
                    <div class="mb-10 ">
                      <label class="font-bold font-heading text-gray-600" for="" contenteditable="false">Email</label>
                      <div class="mt-4 flex items-center rounded-md">
                        <span class="self-stretch px-6 border border-r-0 rounded-l-md">
                          <svg class="h-full" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58888 0 0 3.58888 0 8C0 12.4111 3.58888 16 8 16C9.51561 16 10.9912 15.5737 12.2671 14.7681L11.7329 13.9224C10.6172 14.6275 9.32617 15 8 15C4.14016 15 0.999996 11.8599 0.999996 8.00003C0.999996 4.14016 4.14013 0.999996 8 0.999996C11.8599 0.999996 15 4.14013 15 8V8.50001C15 9.32717 14.3271 10 13.5 10C12.6728 10 12 9.32717 12 8.50001V5.00001H11V5.3824C10.2662 4.54241 9.20032 4.00002 8 4.00002C5.79444 4.00002 4.00002 5.79444 4.00002 8C4.00002 10.2056 5.79444 12 8 12C9.49433 12 10.7844 11.1667 11.471 9.94946C11.925 10.5829 12.663 11 13.5 11C14.8784 11 16 9.87842 16 8.49998V7.99997C16 3.58888 12.4111 0 8 0V0ZM8 11C6.34569 11 5.00001 9.65428 5.00001 8C5.00001 6.34572 6.34572 5.00001 8 5.00001C9.65428 5.00001 11 6.34572 11 8C11 9.65428 9.65428 11 8 11Z" fill="black"></path></svg></span>
                        <input name="email" class="block w-full py-4 px-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-r-md" type="text" value="{data.findUser.email?data.findUser.email:""}"></div>              
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-4">
      
                  <div class="w-full lg:w-1/2 px-4">
      
      
      
                  </div>
      
      
                  <div class="w-full mt-10 mb-10 px-4">
                    <div class="flex flex-wrap -mx-4">
      
                      <div class="w-full lg:w-1/2 px-4">
                        <div class="flex flex-wrap -mx-4">
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="w-full mb-8 px-4">
                    <label class="flex mb-6 items-center">
                      <input type="checkbox" name="accountType" value="personal"><span class="ml-2 text-sm">Shipping address is the same as my billing address</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" name="accountType" value="personal"><span class="ml-2 text-sm">Save this information for next time</span>
                    </label>
                  </div> -->
                  <!-- <div class="w-full mb-8 px-4">
                    <h3 class="mb-4 font-bold font-heading text-gray-600" contenteditable="false">Оплата<br></h3>
                    <label class="flex mb-6 items-center">
                      <input type="radio" name="paymentType" value="" checked=""><span class="ml-2 text-sm" contenteditable="false">По счету</span>
                    </label>
                  
                  </div> -->
      
                </div>
            
            </div>
            <div class="w-full xl:w-1/3 px-4">
              <div class="mb-12 p-6 lg:p-12 bg-blue-300">
                <div class="mb-6 pb-8 border-b border-blue-100">
                  <h2 class="mb-6 text-3xl font-bold font-heading text-white" contenteditable="false">Данные по заказу</h2>
                <!--  <p class="text-blue-50">Shipping and additional costs are calculated based on values you have entered.</p>-->
                </div>
                <!-- <div class="flex mb-2 justify-between items-center">
                  <span class="text-blue-50">Order subtotal</span>
                  <span class="text-xl font-bold font-heading text-white">$89.67</span>
                </div>
                <div class="flex mb-2 justify-between items-center">
                  <span class="text-blue-50">Shipping</span>
                  <span class="text-xl font-bold font-heading text-white">$11.00</span>
                </div>
                <div class="flex mb-5 justify-between items-center">
                  <span class="text-blue-50">Tax</span>
                  <span class="text-xl font-bold font-heading text-white">$0</span>
                </div> -->
                <div class="flex justify-between items-center">
                  <span class="text-xl font-bold font-heading text-white">Итого</span>
                  <span class="text-xl font-bold font-heading text-white">{summ}</span>
                </div>
              </div>
              <div>
                <!-- <span class="inline-block mb-4 font-medium">Apply discount code:</span>
                <div class="flex mb-12 flex-wrap lg:flex-nowrap items-center">
                  <input class="inline-block mb-4 md:mb-0 mr-4 px-4 py-4 placeholder-gray-800 font-bold font-heading border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text" placeholder="SUMMER30X"><a class="inline-block mb-4 md:mb-0 px-7 py-4 text-white font-bold font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md" href="#">Apply</a>
                </div> -->
               
                <button class="block w-full py-4 bg-orange-300 hover:bg-orange-400 text-center text-white font-bold font-heading uppercase rounded-md transition duration-200" >Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </form>