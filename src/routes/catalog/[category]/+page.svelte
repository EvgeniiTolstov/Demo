<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    Countcart,
    SortOrder,
    SortLimit,
    Countwishlist,
  } from "$lib/stores.js";
  import Loader from "$lib/templates/dzc/Loader.svelte";
  export let data;
  const products = data.products.product.data.rows;
  $: totalItems = data.products.product.data.count;
  $: href = $page.url.pathname;
  let addcaetalert = false;
  let wishlistAlert = false;
  let loaderpage = false;

  let limit = Number($SortLimit);
  let sort = $SortOrder;
  $: offset = Number(data.products.product.meta.offset)
    ? Number(data.products.product.meta.offset)
    : 0;
  $: countPage = Math.ceil(totalItems / limit);
  $: console.log("countPage", countPage);
  $: currentPage = Math.ceil(offset / limit) + 1;
  $: console.log("currentPage", currentPage);

  const categories = data.products.section.data.rows;
  const openslug = data.products.openslug;
  $: titleSection = data.products.titleSection.data.rows[0].title;
  const pagination = Math.ceil(totalItems / limit);

  async function addToCart(id) {
    const userid = localStorage.getItem("userid");
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid: id,
        userid: userid,
        count: 1,
      }),
    });
    const data = await response.json();
   
    if (response.status == 200) {
      addcaetalert = true;
      setTimeout(() => {
        addcaetalert = false;
      }, 2000);
      Countcart.update((n) => n + 1);
    } else {
      alert("Ошибка");
    }
  }

  async function addWishlist(id = 0) {
    const userid = localStorage.getItem("userid");
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid: id,
        userid: userid,
        count: 1,
      }),
    });
    const data = await response.json();
   
    if (response.status == 200) {
      wishlistAlert = true;
      setTimeout(() => {
        wishlistAlert = false;
      }, 2000);

      Countwishlist.update((n) => n + 1);
    } else {
      alert("Ошибка");
    }
  }

  function sortSelects() {
    goto(`?${sort}&limit=${limit}`);
    localStorage.setItem("sort", sort);
    $SortOrder = sort;
  }

  function limitSelects() {
    console.log("limit", limit);
    goto(`?${sort}&limit=${limit}`);
    localStorage.setItem("limit", String(limit));
    $SortLimit = limit;
  }

   function pageSelects() {
    console.log("loaderpage", loaderpage);
    loaderpage = true;
   
  }
  $: if (data) {
      loaderpage = false;
    }
</script>

<meta property="og:title" content={titleSection} />
<meta
  property="og:description"
  content="Каталог запасных частей {titleSection} оптом"
/>
<title>Каталог запасных частей {titleSection} оптом</title>
<meta
  name="description"
  content="Каталог запасных частей {titleSection} оптом"
/>
<meta name="keywords" content="Каталог запасных частей {titleSection} оптом" />

<div class="">

  {#if loaderpage}
    <Loader />
  {/if}
  {#if addcaetalert || wishlistAlert}
    <div
      id="popup-modal"
      tabindex="-1"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-green-400">
          <!-- <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button> -->
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-800 w-12 h-12 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {#if addcaetalert}
              <h3
                class="mb-5 text-lg font-normal text-gray-900 dark:text-gray-600"
              >
                Товар добавлен в корзину
              </h3>
            {:else}
              <h3
                class="mb-5 text-lg font-normal text-gray-900 dark:text-gray-600"
              >
                Товар добавлен в список желаний
              </h3>
            {/if}
            <!-- <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Продолжить покупки
                    </button>
                    <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                      Оформить заказ</button> -->
          </div>
        </div>
      </div>
    </div>
  {/if}
  <section class="py-10 bg-gray-100">
    <div class="container mx-auto px-4">
      <ul class="flex flex-wrap mb-8 items-center">
        <li class="mr-5">
          <a
            class="inline-block mr-5 text-xs font-bold font-heading uppercase text-gray-300"
            href="#">Главная</a
          >
          <span class="inline-block">
            <svg
              width="6"
              height="11"
              viewbox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.131073 0.755835C-0.0436907 0.581885 -0.0436907 0.302414 0.131073 0.129744C0.305837 -0.0429273 0.588197 -0.0435662 0.76296 0.129744L5.86893 5.18707C6.04369 5.35975 6.04369 5.63922 5.86893 5.81317L0.762959 10.8705C0.588196 11.0432 0.305836 11.0432 0.131072 10.8705C-0.0436916 10.6972 -0.0436916 10.4171 0.131072 10.2444L4.78774 5.4998L0.131073 0.755835Z"
                fill="#151515"
              />
            </svg>
          </span>
        </li>
        <li class="mr-5">
          <a
            class="inline-block mr-5 text-xs font-bold font-heading uppercase text-gray-300"
            href="../catalog">Каталог</a
          >
          <span class="inline-block">
            <svg
              width="6"
              height="11"
              viewbox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.131073 0.755835C-0.0436907 0.581885 -0.0436907 0.302414 0.131073 0.129744C0.305837 -0.0429273 0.588197 -0.0435662 0.76296 0.129744L5.86893 5.18707C6.04369 5.35975 6.04369 5.63922 5.86893 5.81317L0.762959 10.8705C0.588196 11.0432 0.305836 11.0432 0.131072 10.8705C-0.0436916 10.6972 -0.0436916 10.4171 0.131072 10.2444L4.78774 5.4998L0.131073 0.755835Z"
                fill="#151515"
              />
            </svg>
          </span>
        </li>

        <li>
          <a
            class="inline-block text-xs font-bold font-heading uppercase text-gray-300"
          >
            {titleSection}</a
          >
        </li>
      </ul>
      <div class="flex flex-wrap -mx-4 mb-20 items-center justify-between">
        <div class="w-full lg:w-auto px-4 mb-12 xl:mb-0">
          <h2 class="text-2xl font-bold font-heading">
            {#await data.products.titleSection.data.rows[0].title}
              <span>Загрузка...</span>
            {:then titleSection}
              <span
                >Каталог запасных частей {@html data.products.titleSection.data
                  .rows[0].title}</span
              >
            {/await}

            <b class="relative text-blue-300 underline">оптом</b>
          </h2>
        </div>
        <div class="w-full lg:w-auto px-4 flex flex-wrap items-center">
          <div class="w-full sm:w-auto mb-4 sm:mb-0 mr-5">
            <select
              bind:value={sort}
              on:change={sortSelects}
              class="pl-8 py-4 bg-white text-lg border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
            >
              <option value="order_by=id&order=ASC"
                >Сортировать по порядку</option
              >
              <option value="order_by=price&order=ASC"
                >Сортировать по увеличению цены.</option
              >
              <option value="order_by=price&order=DESC"
                >Сортировать по уменьшению цены.</option
              >
            </select>
          </div>

          <div class="w-full sm:w-auto mb-4 sm:mb-0 mr-5">
            <select
              bind:value={limit}
              on:change={limitSelects}
              class="pl-8 py-4 bg-white text-lg border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
            >
              {#each [10, 20, 30] as item}
                {#if item == limit}
                  <option value={item} selected>{item}</option>
                {:else}
                  <option value={item}>{item}</option>
                {/if}
              {/each}
            </select>
          </div>
          <a
            class="inline-block mr-3 h-full p-4 bg-white rounded-md border"
            href="#"
          >
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ><rect width="4" height="4" rx="2" fill="#2B51C6" /><rect
                x="8"
                width="4"
                height="4"
                rx="2"
                fill="#2B51C6"
              /><rect x="16" width="4" height="4" rx="2" fill="#2B51C6" /><rect
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="#2B51C6"
              /><rect
                x="8"
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="#2B51C6"
              /><rect
                x="16"
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="#2B51C6"
              /><rect y="20" width="4" height="4" rx="2" fill="#2B51C6" /><rect
                x="8"
                y="20"
                width="4"
                height="4"
                rx="2"
                fill="#2B51C6"
              /><rect
                x="16"
                y="20"
                width="4"
                height="4"
                rx="2"
                fill="#2B51C6"
              /></svg
            >
          </a>
          <a
            class="inline-block h-full p-4 hover:bg-white border rounded-md group"
            href="#"
          >
            <svg
              class="text-gray-200 group-hover:text-blue-300"
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ><rect width="4" height="4" rx="2" fill="currentColor" /><rect
                x="8"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="16"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="24"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="8"
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="16"
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="24"
                y="10"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                y="20"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="8"
                y="20"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="16"
                y="20"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /><rect
                x="24"
                y="20"
                width="4"
                height="4"
                rx="2"
                fill="currentColor"
              /></svg
            >
          </a>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-24">
        <div class="hidden lg:block w-1/4 px-3">
          <div class="mb-6 py-10 px-12 bg-gray-50">
            <h3 class="mb-8 text-2xl font-bold font-heading">Каталог</h3>
            <ul class="header-links">
              {#each data.products.section.data.rows as category}
              
              <li class="mb-4" class:active={href==`/catalog/${category.slug}`}><a class="text-lg" href="/catalog/{category.slug}" on:click={pageSelects} ><span>{category.title}</span></a></li>
        
              {/each}
              
             </ul>
          </div>

          <div class="mb-6 py-10 px-12 bg-gray-50">
            <h3 class="mb-6 text-2xl font-bold font-heading">Банер</h3>
          </div>
        </div>
        <div class="w-full lg:w-3/4 px-3">
          <div class="flex flex-wrap -mx-3">
            {#each data.products.product.data.rows as product}
              <div class="w-full sm:w-1/2 md:w-1/3 px-3 mb-8">
                <div class="p-6 bg-gray-50">
                  <span
                    class="px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white"
                    >Артикул: {product.article}</span
                  >
                  <a
                    class="block px-6 mt-6 mb-2"
                    href="{product.section}/{product.id}"
                  >
                    <img
                      class="mb-5 mx-auto h-56 w-full object-contain"
                      src="/api/files/read?folder=/&file={product.image}&width=200&height=250"
                      alt={product.title}
                    />
                    <h3 class="mb-2 text-xl font-bold font-heading">
                      {product.title}
                    </h3>
                    <p class="text-lg font-bold font-heading text-blue-500">
                      <span>
                        {#if product.price}
                          {product.price} руб.
                        {:else}
                          Цену уточняйте у менеджера
                        {/if}
                      </span>
                      <!--  <span class="text-xs text-gray-500 font-semibold font-heading line-through">$33.69</span> -->
                    </p>
                  </a>
                  <div class="flex items-center">
                    <button
                      on:click={() => addWishlist(product.id)}
                      class="ml-auto mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-bag-heart"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                        />
                      </svg>
                    </button>
                    <button
                      on:click={() => addToCart(product.id)}
                      class="mr-2 flex items-center justify-center w-12 h-12 border rounded-lg hover:border-gray-500"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-cart-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
                        />
                        <path
                          d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
  
      <div class="text-center">
        {#if currentPage > 3}
          <a
            class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-3 px-4 rounded-md uppercase"
            href="?limit={limit}&offset=0&{sort}"
            on:click={pageSelects}
            >1 ...</a
          >
        {/if}
        {#if offset > 0}
          <a
            class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-3 px-4 rounded-md uppercase"
            href="?limit={limit}&offset={offset - limit}&{sort}"
            on:click={pageSelects}
          >
            Назад
          </a>
        {/if}

        {#each Array(Math.ceil(totalItems / limit)) as _, idx}
          {#if idx > offset / limit - 3 && idx < offset / limit + 3}
            {#if idx * limit == offset}
              <a
                class="inline-block bg-orange-500 text-white font-bold font-heading mr-2 py-3 px-4 rounded-md uppercase"
                href="?limit={limit}&offset={idx * limit}&{sort} " on:click={pageSelects}>{idx + 1}</a
              >
            {:else}
              <a
                class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading mr-2 py-3 px-4 rounded-md uppercase"
                href="?limit={limit}&offset={idx * limit}&{sort}"
                on:click={pageSelects}>{idx + 1}</a
              >
            {/if}
          {/if}
        {/each}
        {#if offset + limit < totalItems}
          <a
            class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-3 px-4 rounded-md uppercase"
            href="?limit={limit}&offset={offset + limit}&{sort}"
            on:click={pageSelects}>В перед</a
          >
        {/if}
        {#if offset < totalItems - limit * 3}
          <a
            class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-3 px-4 rounded-md uppercase"
            href="?limit={limit}&offset={totalItems - limit}&{sort}"
            on:click={pageSelects}>... {countPage}</a
          >
        {/if}
      
      </div>
    </div>
  </section>
</div>
<style>
  .header-links li span {
    position: relative;
    z-index: 0;
  }

  .header-links li span::before {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 2px;
    left: -4px;
    right: -4px;
    display: block;
    height: 6px;
  }

  .header-links li.active span::before {
    background-color: #f96c48;
  }

  .header-links li:not(.active):hover span::before {
    background-color: #ccc;
  }
</style>