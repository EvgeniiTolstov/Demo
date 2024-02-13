<script>
  import { enhance } from "$app/forms";
  import Loading from "$lib/templates/dzc/Loader.svelte";
  import { page } from "$app/stores";
  import { Loader } from "$lib/stores.js";

  export let data;
  export let form;
  $: href = $page.url.pathname;
  $: $Loader = href;

  let contactForm = "";

  function loaders(href) {
    if (href != $Loader) {
      $Loader = "";
    }
  }

  const sections = data.sections.data.rows;
</script>

{#if $Loader !== href}
  <Loading />
{/if}
<title
  >Производитель запасных частей для грузовых автомобилей</title
>

{#if form?.success}
  <div
    class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
    role="alert"
  >
    <div class="flex">
      <div class="py-1">
        <svg
          class="fill-current h-6 w-6 text-teal-500 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          ><path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          /></svg
        >
      </div>
      <div>
        <p class="font-bold">Спасибо!</p>
        <p class="text-sm">Ваша заявка принята.</p>
      </div>
    </div>
  </div>
{/if}
<div class="">
  <section class="relative">
    <div class="py-2 bg-blue-300">
      <div class="flex items-center justify-center">
        <svg
          class="mr-2"
          width="18"
          height="11"
          viewbox="0 0 18 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><rect
            y="3.07129"
            width="4"
            height="10"
            rx="2"
            transform="rotate(-45 0 3.07129)"
            fill="white"
          ></rect><rect
            x="8"
            y="2.82861"
            width="4"
            height="10"
            rx="2"
            transform="rotate(-45 8 2.82861)"
            fill="white"
          ></rect></svg
        >
        <p class="text-xs font-bold font-heading text-2xl text-white">
          Запасные части для грузовых автомобилей оптом в Москве
        </p>
      </div>
    </div>

    <div
      class="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50"
    >
      <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
      <nav
        class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto"
      >
        <div class="flex items-center mb-8">
          <a class="mr-auto text-3xl font-bold font-heading" href="#">
            <img
              class="h-9"
              src="yofte-assets/logos/yofte-logo.svg"
              alt=""
              width="auto"
            />
          </a>
          <button class="navbar-close">
            <svg
              class="h-2 w-2 text-gray-500 cursor-pointer"
              width="10"
              height="10"
              viewbox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00002 1L1 9.00002M1.00003 1L9.00005 9.00002"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex mb-8 justify-between">
          <a
            class="inline-flex items-center font-semibold font-heading"
            href="#"
          >
            <svg
              class="mr-3"
              width="32"
              height="31"
              viewbox="0 0 32 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0006 16.3154C19.1303 16.3154 21.6673 13.799 21.6673 10.6948C21.6673 7.59064 19.1303 5.07422 16.0006 5.07422C12.871 5.07422 10.334 7.59064 10.334 10.6948C10.334 13.799 12.871 16.3154 16.0006 16.3154Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M24.4225 23.8963C23.6678 22.3507 22.4756 21.0445 20.9845 20.1298C19.4934 19.2151 17.7647 18.7295 15.9998 18.7295C14.2349 18.7295 12.5063 19.2151 11.0152 20.1298C9.52406 21.0445 8.33179 22.3507 7.57715 23.8963"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>Sign In</span>
          </a>
          <div class="flex items-center">
            <a class="mr-10" href="#">
              <svg
                width="23"
                height="20"
                viewbox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4998 19.2061L2.70115 9.92527C1.92859 9.14433 1.41864 8.1374 1.24355 7.04712C1.06847 5.95684 1.23713 4.8385 1.72563 3.85053V3.85053C2.09464 3.10462 2.63366 2.45803 3.29828 1.96406C3.9629 1.47008 4.73408 1.14284 5.5483 1.00931C6.36252 0.875782 7.19647 0.939779 7.98144 1.19603C8.7664 1.45228 9.47991 1.89345 10.0632 2.48319L11.4998 3.93577L12.9364 2.48319C13.5197 1.89345 14.2332 1.45228 15.0182 1.19603C15.8031 0.939779 16.6371 0.875782 17.4513 1.00931C18.2655 1.14284 19.0367 1.47008 19.7013 1.96406C20.3659 2.45803 20.905 3.10462 21.274 3.85053V3.85053C21.7625 4.8385 21.9311 5.95684 21.756 7.04712C21.581 8.1374 21.071 9.14433 20.2984 9.92527L11.4998 19.2061Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </a>
            <a class="flex items-center" href="#">
              <svg
                class="mr-3"
                width="23"
                height="23"
                viewbox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.1159 8.72461H2.50427C1.99709 8.72461 1.58594 9.12704 1.58594 9.62346V21.3085C1.58594 21.8049 1.99709 22.2074 2.50427 22.2074H18.1159C18.6231 22.2074 19.0342 21.8049 19.0342 21.3085V9.62346C19.0342 9.12704 18.6231 8.72461 18.1159 8.72461Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.34473 6.34469V4.95676C6.34473 3.85246 6.76252 2.79338 7.5062 2.01252C8.24988 1.23165 9.25852 0.792969 10.3102 0.792969C11.362 0.792969 12.3706 1.23165 13.1143 2.01252C13.858 2.79338 14.2758 3.85246 14.2758 4.95676V6.34469"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span
                class="inline-block w-6 h-6 text-center bg-gray-100 rounded-full font-semibold font-heading"
                >3</span
              >
            </a>
          </div>
        </div>
        <input
          class="block mb-10 py-5 px-8 bg-gray-100 rounded-md border-transparent focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
          type="search"
          placeholder="Search"
        />
   
      </nav>
    </div>
  </section>

  <section>
    <div class="relative py-12 bg-blue-300 overflow-hidden">
      <img
        class="absolute bottom-0 left-0 w-full object-cover"
        src="yofte-assets/elements/lines.png"
        alt=""
      />
      <div class="relative container mx-auto px-4">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div class="px-4 md:px-8 py-12 bg-white">
              <h4
                class="pl-8 mb-2 text-xs font-bold font-heading text-gray-500 uppercase"
              >
                Кталог
              </h4>

              <ul class="mb-5">
                {#each sections as section}
                  <li class="py-5 px-8 border-b">
                    <a
                      class="flex items-center text-lg font-bold font-heading hover:text-blue-300"
                      href="/catalog/{section.slug}"
                      on:click={() => loaders(`catalog/${section.slug}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewbox="0 0 24 24"
                        class="mr-10"
                        ><circle cx="9" cy="10.5" r="1"></circle><circle
                          cx="15"
                          cy="10.5"
                          r="1"
                        ></circle><path
                          d="M5.78 16h.44c.43 0 .78-.36.78-.81V14h10v1.19c0 .45.34.81.78.81h.44c.43 0 .78-.36.78-.81v-6.5L17.44 4c-.05-.16-.12-.29-.19-.4-.02-.02-.03-.04-.05-.07-.38-.52-.92-.53-.92-.53H7.72s-.54.01-.92.54c-.02.02-.03.04-.05.06-.07.11-.14.24-.19.4L5 8.69v6.5c0 .45.35.81.78.81zM8.33 5h7.34l.23.69.43 1.31H7.67l.66-2zM7 9.01V9h10v3H7V9.01zm-3 8V19h7v3h2v-3h7v-1.99z"
                        ></path></svg
                      >
                      <span>{section.title}</span>
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          <div class="w-full lg:w-2/3 px-4">
            <section class="bg-blue-50 bg-opacity-20">
              <div class="container mx-auto px-4 pb-16">
                <div class="flex flex-wrap -mx-4">
                  <div class="w-full lg:w-8/12 px-4 mb-6 lg:mb-0">
                    <div class="relative h-full bg-white overflow-hidden">
                      <img
                        class="absolute right-0 top-0 w-1/2 h-full object-cover"
                        src="/api/files/read?folder=images&file=DZCBANER.jpg&width=350&height=500"
                        alt=""
                      />
                      <div
                        class="hidden lg:flex absolute right-0 top-1/2 pr-10 transform -translate-y-1/2 flex-col items-center"
                      >
                        <span class="mb-5 font-bold font-heading">01</span>
                        <div class="mb-5 h-16 w-px bg-gray-100"></div>
                        <button class="mb-5">
                          <img src="yofte-assets/elements/circle.svg" alt="" />
                        </button>
                        <button class="mb-6 w-1 h-1 bg-blue-500 rounded-full"
                        ></button>
                        <button class="mb-6 w-1 h-1 bg-blue-500 rounded-full"
                        ></button>
                        <div class="h-16 w-px bg-gray-100"></div>
                      </div>
                      <div class="relative max-w-xl pl-6 lg:pl-20 pt-32 pb-24">
                     
                        <h2
                          class="mt-6 mb-8 text-5xl lg:text-4xl font-bold font-heading"
                        >
                          <span>Запчасти </span>
                          <span class="text-blue-500">для грузовиков</span>
                          <span>от проиводителя.</span>
                        </h2>
                    
                    
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <a href="#">
                      <img
                        class="mb-6"
                        src="/api/files/read?folder=images&file=DZCBANER.jpg&width=450&height=600"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        src="/api/files/read?folder=images&file=DZCBANER.jpg&width=650&height=800"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div
      class="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50"
    >
      <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
      <nav
        class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto"
      >
        <div class="flex items-center mb-8">
          <a class="mr-auto text-3xl font-bold font-heading" href="#">
            <img
              class="h-9"
              src="yofte-assets/logos/yofte-logo.svg"
              alt=""
              width="auto"
            />
          </a>
          <button class="navbar-close">
            <svg
              class="h-2 w-2 text-gray-500 cursor-pointer"
              width="10"
              height="10"
              viewbox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00002 1L1 9.00002M1.00003 1L9.00005 9.00002"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex mb-8 justify-between">
          <a
            class="inline-flex items-center font-semibold font-heading"
            href="#"
          >
            <svg
              class="mr-3"
              width="32"
              height="31"
              viewbox="0 0 32 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0006 16.3154C19.1303 16.3154 21.6673 13.799 21.6673 10.6948C21.6673 7.59064 19.1303 5.07422 16.0006 5.07422C12.871 5.07422 10.334 7.59064 10.334 10.6948C10.334 13.799 12.871 16.3154 16.0006 16.3154Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M24.4225 23.8963C23.6678 22.3507 22.4756 21.0445 20.9845 20.1298C19.4934 19.2151 17.7647 18.7295 15.9998 18.7295C14.2349 18.7295 12.5063 19.2151 11.0152 20.1298C9.52406 21.0445 8.33179 22.3507 7.57715 23.8963"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>Sign In</span>
          </a>
          <div class="flex items-center">
            <a class="mr-10" href="#">
              <svg
                width="23"
                height="20"
                viewbox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4998 19.2061L2.70115 9.92527C1.92859 9.14433 1.41864 8.1374 1.24355 7.04712C1.06847 5.95684 1.23713 4.8385 1.72563 3.85053V3.85053C2.09464 3.10462 2.63366 2.45803 3.29828 1.96406C3.9629 1.47008 4.73408 1.14284 5.5483 1.00931C6.36252 0.875782 7.19647 0.939779 7.98144 1.19603C8.7664 1.45228 9.47991 1.89345 10.0632 2.48319L11.4998 3.93577L12.9364 2.48319C13.5197 1.89345 14.2332 1.45228 15.0182 1.19603C15.8031 0.939779 16.6371 0.875782 17.4513 1.00931C18.2655 1.14284 19.0367 1.47008 19.7013 1.96406C20.3659 2.45803 20.905 3.10462 21.274 3.85053V3.85053C21.7625 4.8385 21.9311 5.95684 21.756 7.04712C21.581 8.1374 21.071 9.14433 20.2984 9.92527L11.4998 19.2061Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </a>
            <a class="flex items-center" href="#">
              <svg
                class="mr-3"
                width="23"
                height="23"
                viewbox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.1159 8.72461H2.50427C1.99709 8.72461 1.58594 9.12704 1.58594 9.62346V21.3085C1.58594 21.8049 1.99709 22.2074 2.50427 22.2074H18.1159C18.6231 22.2074 19.0342 21.8049 19.0342 21.3085V9.62346C19.0342 9.12704 18.6231 8.72461 18.1159 8.72461Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6.34473 6.34469V4.95676C6.34473 3.85246 6.76252 2.79338 7.5062 2.01252C8.24988 1.23165 9.25852 0.792969 10.3102 0.792969C11.362 0.792969 12.3706 1.23165 13.1143 2.01252C13.858 2.79338 14.2758 3.85246 14.2758 4.95676V6.34469"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span
                class="inline-block w-6 h-6 text-center bg-gray-100 rounded-full font-semibold font-heading"
                >3</span
              >
            </a>
          </div>
        </div>
        <input
          class="block mb-10 py-5 px-8 bg-gray-100 rounded-md border-transparent focus:ring-blue-300 focus:border-blue-300 focus:outline-none"
          type="search"
          placeholder="Search"
        />
    
      </nav>
    </div>
  </section>

  <section class="py-20 bg-gray-100 overflow-x-hidden">
    <div class="container mx-auto px-4">
      <h2 class="mb-16 md:mb-24 text-4xl md:text-5xl font-bold font-heading">
        Запчасти оптом в Москве
      </h2>
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-wrap -mx-4 mb-24">
          <div class="w-full md:w-1/2 px-4 md:px-10 mb-20">
            <div class="relative h-full bg-gray-50">
              <a class="block" href="/catalog">
                <img
                  class="w-full h-64 object-cover"
                  src="images/depositphotos-35974993-original.jpg"
                  alt=""
                />
              </a>
              <div class="px-6 pb-8 mt-8">
                <a class="block px-6 mb-6" href="/catalog">
                  <h3 class="mb-2 text-xl font-bold font-heading">
                    Каталог запасных частей
                  </h3>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4 md:px-10 mb-20">
            <div class="relative h-full bg-gray-50">
              <a class="block" href="/about/contact">
                <img
                  class="w-full h-64 object-cover"
                  src="/api/files/read?folder=images&file=people-taking.avif&width=450&height=300"
                  alt=""
                />
              </a>
              <div class="px-6 pb-8 mt-8">
                <a class="block px-6 mb-6" href="/about/contact">
                  <h3 class="mb-2 text-xl font-bold font-heading">
                    Стать нашим партнером
                  </h3>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4 md:px-10 mb-20 md:mb-0">
            <div class="relative h-full bg-gray-50">
              <a class="block" href="/about">
                <img
                  class="w-full h-64 object-cover object-top"
                  src="/api/files/read?folder=images&file=female-mechanic.avif&width=450&height=300"
                  alt=""
                />
              </a>
              <div class="px-6 pb-8 mt-8">
                <a class="block px-6 mb-6" href="/about">
                  <h3 class="mb-2 text-xl font-bold font-heading">О нас</h3>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-4 md:px-10">
            <div class="relative h-full bg-gray-50">
              <a class="block" href="/about/contact">
                <img
                  class="w-full h-64 object-cover object-bottom"
                  src="/api/files/read?folder=images&file=message-online.avif&width=450&height=300"
                  alt=""
                />
              </a>
              <div class="px-6 pb-6 mt-8">
                <a class="block px-6 mb-6" href="/about/contact">
                  <h3 class="mb-2 text-xl font-bold font-heading">Контакты</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="relative py-20 bg-gray-100 overflow-x-hidden">
    <div class="container mx-auto px-4">
      <div class="relative flex mb-20 flex-wrap bg-white">
        <div
          class="hidden md:block absolute top-1/2 left-0 w-64 h-2/3 -ml-6 transform -translate-y-1/2 bg-blue-200"
        ></div>
        <div class="relative w-full md:w-1/2 lg:w-1/3 h-64 md:h-auto">
          <img
            class="h-full w-full object-cover"
            src="/api/files/read?folder=images&file=DZCBANER.jpg&width=450&height=1000"
            alt=""
          />
        </div>
        <div class="w-full md:w-1/2 lg:w-2/3 p-6 self-center">
          <div class="max-w-lg mx-auto">
            <div class="mb-10 pb-10 border-b">
              <h2 class="mb-2 text-3xl font-bold font-heading">
                Компания xxx - производитель запасных частей для грузовых
                автомобилей.
              </h2>
              <span class="text-lg font-bold font-heading text-blue-300"
                >Ваш надежный партнер в мире грузового транспорта.</span
              >
            </div>

            <p class="mb-12 md:mb-20 text-lg text-gray-500">
              Компания xxx специализируется на производстве и продаже
              качественных запасных частей для грузовых автомобилей разных марок
              и моделей. Наш ассортимент включает в себя детали двигателя,
              трансмиссии, ходовой, тормозной, электрической и других систем, а
              также кузовные элементы, оптику, аксессуары и расходные материалы.
              Мы работаем только с проверенными поставщиками и используем
              современное оборудование для производства наших изделий. Все наши
              запчасти соответствуют стандартам качества и безопасности, а также
              имеют гарантию от производителя. Мы постоянно следим за новинками
              и трендами в области грузового транспорта и улучшаем наши продукты
              в соответствии с потребностями наших клиентов. Компания
              «Груз-Авто» предлагает своим покупателям выгодные условия
              сотрудничества, включая гибкую систему скидок, оперативную
              доставку, удобные способы оплаты и квалифицированную техническую
              поддержку. Мы ценим каждого нашего клиента и стремимся к
              долгосрочному и взаимовыгодному партнерству. Если вы ищете
              надежного и профессионального производителя запасных частей для
              грузовых автомобилей, обращайтесь к нам!
            </p>
          </div>
        </div>
      </div>
      <div class="text-center"></div>
    </div>
  </section>
  <section class="relative py-20 bg-gray-100 overflow-x-hidden">
    <div class="container px-4 mx-auto">
      <div class="flex flex-wrap -mx-12">
        <div class="w-full lg:w-1/2 px-12 mb-12 lg:mb-0">
          <div class="max-w-xl lg:pr-16">
            <h2 class="mb-14 text-4xl md:text-6xl font-bold font-heading">
              <span class="text-blue-300">Партнерство с нами:</span>
              <span>мы всегда открыты к сотрудничеству.</span>
            </h2>
            <ul class="flex flex-col items-start">
              <li class="inline-flex items-center mb-2 px-6 py-3 bg-white">
                <span class="mr-6">
                  <svg
                    width="36"
                    height="36"
                    viewbox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                    <g clip-path="url(#clip0)">
                      <path
                        d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z"
                        fill="white"
                      ></path>
                    </g>
                    <defs
                      ><clippath id="clip0"
                        ><rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(9 9)"
                        ></rect></clippath
                      ></defs
                    >
                  </svg>
                </span>
                <p>
                  Сотрудничая с нами, вы можете быть  уверены в качестве
                  продукции и оперативности ее доставки. Более того, у нас —
                  умеренные цены и гарантии качества. Главной нашей целью и, в
                  какой-то даже мере, миссией является не «холодная» продажа
                  товара, а забота о покупателе. Все товары аккуратно упакованы.
                  Мы занимаемся реализацией только качественных запчастей для
                  автомобилей КамАЗ, Маз, Зил, Газ, МТЗ, УРАЛ, БелАЗ, КрАЗ.
                  Обратившись к нам Вы сделали правильный выбор, и мы
                  гарантируем вам только удачные покупки и качественные услуги!
                </p>
              </li>
            </ul>
          </div>
        </div>

        <form
          action="?/contact_form"
          method="post"
          use:enhance={() =>
            ({ form, result, update }) => {
              if (result.type === "success") {
                // clear only message input
                contactForm = result.type;
                console.log("result", result);
                const message_input = form.elements.namedItem("message");
                if (message_input instanceof HTMLInputElement) {
                  message_input.value = "";
                  return; // prevent the `form` prop from being updated
                }
              }
              update();
            }}
        >
          <div
            class="lg:absolute lg:top-0 lg:bottom-0 lg:right-0 w-full lg:w-1/2 flex items-center justify-center py-20 px-12 bg-blue-300"
          >
            <div class="absolute left-0 -ml-8 w-8 h-5/6 bg-blue-200"></div>

            <div class="relative text-center">
              <a class="inline-block mb-14" href="#">
                <img class="h-9" src="images/logohead.png" alt="" />
              </a>

              <h2
                class="mb-5 text-4xl md:text-5xl text-white font-bold font-heading"
              >
                Обратная связь
              </h2>

              {#if contactForm === "success"}
                <div
                  class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div class="flex">
                    <div class="py-1">
                      <svg
                        class="fill-current h-6 w-6 text-teal-500 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        ><path
                          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                        /></svg
                      >
                    </div>
                    <div>
                      <p class="font-bold">Спасибо!</p>
                      <p class="text-sm">Ваша заявка принята.</p>
                    </div>
                  </div>
                </div>
              {/if}
              <img
                class="mb-12 inline-block"
                src="yofte-assets/elements/quote.svg"
                alt=""
              />

              <div class="relative max-w-xl mx-auto bg-white rounded-lg">
                <img
                  class="absolute top-0 right-0 h-40 -mt-12 -mr-20"
                  src="yofte-assets/elements/quote-light.png"
                  alt=""
                />
                <div
                  class="relative lg:max-w-xl lg:mx-auto bg-white rounded-lg"
                >
                  <div
                    class="relative flex flex-wrap items-center justify-between"
                  >
                    <div class="relative flex-1">
                      <span
                        class="absolute top-0 left-0 ml-8 mt-4 font-semibold font-heading text-xs text-gray-400"
                        >Имя</span
                      >
                      <input
                        name="name"
                        class="inline-block w-full pt-8 pb-4 px-8 placeholder-gray-300 border-0 focus:ring-transparent focus:outline-none rounded-md"
                        type="text"
                        placeholder="Иван Николаевич"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div class="relative max-w-xl mx-auto bg-white rounded-lg">
                <img
                  class="absolute top-0 right-0 h-40 -mt-12 -mr-20"
                  src="yofte-assets/elements/quote-light.png"
                  alt=""
                />
                <div
                  class="relative lg:max-w-xl lg:mx-auto bg-white rounded-lg"
                >
                  <div
                    class="relative flex flex-wrap items-center justify-between"
                  >
                    <div class="relative flex-1">
                      <span
                        class="absolute top-0 left-0 ml-8 mt-4 font-semibold font-heading text-xs text-gray-400"
                        >Телефон</span
                      >
                      <input
                        name="phone"
                        class="inline-block w-full pt-8 pb-4 px-8 placeholder-gray-300 border-0 focus:ring-transparent focus:outline-none rounded-md"
                        type="text"
                        placeholder="+7 123 123 12 12"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div class="relative max-w-xl mx-auto bg-white rounded-lg">
                <img
                  class="absolute top-0 right-0 h-40 -mt-12 -mr-20"
                  src="yofte-assets/elements/quote-light.png"
                  alt=""
                />
                <div
                  class="relative lg:max-w-xl lg:mx-auto bg-white rounded-lg"
                >
                  <div
                    class="relative flex flex-wrap items-center justify-between"
                  >
                    <div class="relative flex-1">
                      <span
                        class="absolute top-0 left-0 ml-8 mt-4 font-semibold font-heading text-xs text-gray-400"
                        >e-mail</span
                      >
                      <input
                        name="email"
                        class="inline-block w-full pt-8 pb-4 px-8 placeholder-gray-300 border-0 focus:ring-transparent focus:outline-none rounded-md"
                        type="email"
                        placeholder="steven@example.dev"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <button
                id="contactButton"
                class="inline-block w-auto bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-6 px-8 rounded-md uppercase text-center"
                >отправить</button
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</div>
