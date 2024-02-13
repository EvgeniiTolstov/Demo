<script lang="ts">
import {Countcart} from '$lib/stores.js';

export let data;

let addcaetalert = false;
let wishlistAlert = false;
const title = data.dataproduct.title;
const price = data.dataproduct.price;
const description = data.dataproduct.description;
const images = data.dataproduct.image;
const article = data.dataproduct.article;
const id = data.dataproduct.id;
$: category = data.datacategory.rows[0].title;
$: categoryslug = data.categoryslug;
let counts:number = 1;

async function countPluse(){
  counts++;
  console.log('counts',counts);
}
async function countMinuse(){
  counts--;
  console.log('counts',counts);
}
async function addToCart(id) {
   const userid = localStorage.getItem('userid');
  

   const response = await fetch('/api/cart', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       productid: id,
       userid: userid,
      count: Number(counts)
     })
   });
   const data = await response.json();
   console.log(data)
   // если ответ 200 то добавить в корзину
   if (response.status == 200) {
     Countcart.update(n => n + Number(counts));
   } else {
     alert('Ошибка')
 
   }
   
 }

</script>
<meta property="og:title" content="{title} Артикул: {article}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="/api/files/read?folder=/&file={images}&width=480&height=564" />
<meta property="og:type" content="website" />
<title>{title} Артикул: {article}</title>

<meta name="description" content="{description} Артикул: {article}">
<meta name="keywords" content="{title}">


<div class="">
                
    <section class="pt-10">
      <div class="container mx-auto px-4">
        <ul class="flex flex-wrap mb-8 items-center">
          <li class="mr-5">
            <a class="inline-block mr-5 text-xs font-bold font-heading uppercase text-gray-300" href="/">Главная</a>
            <span class="inline-block">
              <svg width="6" height="11" viewbox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.131073 0.755835C-0.0436907 0.581885 -0.0436907 0.302414 0.131073 0.129744C0.305837 -0.0429273 0.588197 -0.0435662 0.76296 0.129744L5.86893 5.18707C6.04369 5.35975 6.04369 5.63922 5.86893 5.81317L0.762959 10.8705C0.588196 11.0432 0.305836 11.0432 0.131072 10.8705C-0.0436916 10.6972 -0.0436916 10.4171 0.131072 10.2444L4.78774 5.4998L0.131073 0.755835Z" fill="#151515"></path>
              </svg>
            </span>
          </li>
          <li class="mr-5">
            <a class="inline-block mr-5 text-xs font-bold font-heading uppercase text-gray-300" href="/catalog/">Каталог</a>
            <span class="inline-block">
              <svg width="6" height="11" viewbox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.131073 0.755835C-0.0436907 0.581885 -0.0436907 0.302414 0.131073 0.129744C0.305837 -0.0429273 0.588197 -0.0435662 0.76296 0.129744L5.86893 5.18707C6.04369 5.35975 6.04369 5.63922 5.86893 5.81317L0.762959 10.8705C0.588196 11.0432 0.305836 11.0432 0.131072 10.8705C-0.0436916 10.6972 -0.0436916 10.4171 0.131072 10.2444L4.78774 5.4998L0.131073 0.755835Z" fill="#151515"></path>
              </svg>
            </span>
          </li>
          <li class="mr-5">
            <a class="inline-block mr-5 text-xs font-bold font-heading uppercase text-gray-300" href="../{categoryslug}">{category}</a>
            <span class="inline-block">
              <svg width="6" height="11" viewbox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.131073 0.755835C-0.0436907 0.581885 -0.0436907 0.302414 0.131073 0.129744C0.305837 -0.0429273 0.588197 -0.0435662 0.76296 0.129744L5.86893 5.18707C6.04369 5.35975 6.04369 5.63922 5.86893 5.81317L0.762959 10.8705C0.588196 11.0432 0.305836 11.0432 0.131072 10.8705C-0.0436916 10.6972 -0.0436916 10.4171 0.131072 10.2444L4.78774 5.4998L0.131073 0.755835Z" fill="#151515"></path>
              </svg>
            </span>
          </li>
          <li><a class="inline-block text-xs font-bold font-heading uppercase text-gray-300" > {title}</a></li>
        
        </ul>
        <div class="flex flex-wrap items-center -mx-4 ">
          <div class="w-full lg:w-1/3 px-4 mb-10 lg:mb-0">
            <span class="text-gray-500">Артикул: {article}</span>
            <h2 class="mt-2 mb-6 max-w-xl text-5xl md:text-xl font-bold font-heading">{title}
    </h2>
            
            <p class="inline-block mb-8 text-2xl font-bold font-heading text-blue-300">
              <span>  {#if price}
                {price} руб.
                {:else}
                Цену уточняйте у менеджера
                {/if}</span>
              <!-- <span class="font-normal text-base text-gray-400 line-through">{price}</span> -->
            </p>
           <!-- <p class="max-w-md text-gray-500">Maecenas commodo libero ut molestie dictum. Morbi placerat eros id porttitor sagittis.</p>-->
          </div>
          <div class="w-full lg:w-1/3 px-4 mb-40 lg:mb-0">
            <div class="relative" style="height: 564px;">
            
              <img class="object-cover w-full h-full" src="/api/files/read?folder=/&file={images}&width=480&height=564" alt="">
            
              <!-- <div class="flex justify-center -mt-12 -mx-2">
                <a class="inline-block mr-4 h-28 w-1/4" href="#">
                  <img class="w-full h-full object-cover" src="/images/depositphotos-35974993-original.jpg" alt="">
                </a>
                <a class="inline-block h-28 w-1/4" href="#">
                  <img class="w-full h-full object-cover" src="/images/depositphotos-35974993-original.jpg" alt="">
                </a>
              </div> -->
            </div>
          </div>
          
          <div class="w-full lg:w-1/3 px-4">
            <div class="flex mb-12 -mx-4">
              <div class="w-1/2 px-4">
                <p class="inline-block mb-8 text-2xl font-bold font-heading text-blue-300">
                  <span>  {#if price}
                    {price} руб.
                    {:else}
                    Цену уточняйте у менеджера
                    {/if}</span>
                  <!-- <span class="font-normal text-base text-gray-400 line-through">{price}</span> -->
                </p>
                <span class="block mb-4 font-bold font-heading text-gray-400 uppercase">Количество</span>
                <div class="inline-flex items-center px-4 font-semibold font-heading text-gray-500 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md">
                  <button class="py-2 hover:text-gray-700" on:click={countMinuse}>
                    <svg width="12" height="2" viewbox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.35"><rect x="12" width="2" height="12" transform="rotate(90 12 0)" fill="currentColor"></rect></g></svg>
                  </button>
                  <input bind:value={ counts }
                   class="w-12 m-0 px-2 py-4 text-center  border-0 focus:ring-transparent focus:outline-none rounded-md" type="text" placeholder="{counts}">
                  <button on:click={() => countPluse()} class="py-2 hover:text-gray-700">
                   
                    <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.35"><rect x="5" width="2" height="12" fill="currentColor"></rect><rect x="12" y="5" width="2" height="12" transform="rotate(90 12 5)" fill="currentColor"></rect></g></svg>
                  </button>
                </div>
              </div>
              
            </div>
            <div class="flex mb-14 items-center">
              <a on:click={() => addToCart(id)} class="inline-block w-full mr-6 bg-orange-300 hover:bg-orange-400 text-center text-white font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200" href="#">В корзину</a>
              <a class="flex-shrink-0 inline-flex mr-4 items-center justify-center w-16 h-16 rounded-md border hover:border-gray-500" href="#">
                <svg width="27" height="27" viewbox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4993 26.2061L4.70067 16.9253C3.9281 16.1443 3.41815 15.1374 3.24307 14.0471C3.06798 12.9568 3.23664 11.8385 3.72514 10.8505V10.8505C4.09415 10.1046 4.63318 9.45803 5.29779 8.96406C5.96241 8.47008 6.73359 8.14284 7.54782 8.00931C8.36204 7.87578 9.19599 7.93978 9.98095 8.19603C10.7659 8.45228 11.4794 8.89345 12.0627 9.48319L13.4993 10.9358L14.9359 9.48319C15.5192 8.89345 16.2327 8.45228 17.0177 8.19603C17.8026 7.93978 18.6366 7.87578 19.4508 8.00931C20.265 8.14284 21.0362 8.47008 21.7008 8.96406C22.3654 9.45803 22.9045 10.1046 23.2735 10.8505V10.8505C23.762 11.8385 23.9306 12.9568 23.7556 14.0471C23.5805 15.1374 23.0705 16.1443 22.298 16.9253L13.4993 26.2061Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </a>
            </div>
            <!-- <div class="flex items-center">
              <span class="mr-8 text-gray-500 font-bold font-heading uppercase">ПОДЕЛИТЬСЯ</span>
              <a class="mr-1 w-8 h-8" href="#">
                <img src="/yofte-assets/buttons/facebook-circle.svg" alt="">
              </a>
              <a class="mr-1 w-8 h-8" href="#">
                <img src="/yofte-assets/buttons/instagram-circle.svg" alt="">
              </a>
              <a class="w-8 h-8" href="#">
                <img src="/yofte-assets/buttons/twitter-circle.svg" alt="">
              </a>
            </div> -->
          </div>
        </div>
      </div>
      <div class="bg-gray-100">
        <div class="container mx-auto px-4">
          <div class="relative pt-12 pb-20 lg:pt-20">
            <ul class="lg:absolute top-0 lg:-mt-16 mb-8 lg:mb-0 flex flex-wrap">
              <li class="w-1/2 lg:w-auto text-center"><a class="inline-block py-8 px-2 md:px-10 bg-white text-gray-500 font-bold font-heading shadow-2xl" href="#">Описание</a></li>
              <li class="w-1/2 lg:w-auto text-center">
              <li class="w-1/2 lg:w-auto text-center">
              <li class="w-1/2 lg:w-auto text-center">
            </ul>
           <!-- <h3 class="mb-8 text-3xl font-bold font-heading text-blue-300">Описание</h3>-->
            <p class="max-w-2xl text-gray-500">
            {#if description}
            {description}
            {:else}
            {title} - это надежная запчасть, которая обеспечивает высокую производительность вашего автомобиля. Наши запчасти изготовленны из качественных материалов, что обеспечивает их долговечность и надежность.

            Мы предлагаем конкурентоспособные цены и быструю доставку.
            
            Закажите {title} у нас прямо сейчас и получите надежный продукт по выгодной цене!

            {/if}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>