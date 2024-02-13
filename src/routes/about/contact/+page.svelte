<script>

    export let data;
    export let form;

</script>
<title>Контакты компании.</title>
<meta name="description" content="Контакты компании . Контактная информация.">

<meta property="og:title" content="Контакты компании . Контактная информация.">
<meta property="og:description" content="Контакты компании . Контактная информация.">


<section class="relative py-20 bg-gray-100 overflow-x-hidden">
  {#if form?.success}
<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">Спасибо!</p>
      <p class="text-sm">Ваша заявка принята.</p>
    </div>
  </div>
</div>
{/if}
  <div class="container px-4 mx-auto">
    <div class="flex flex-wrap -mx-12">
      <div class="w-full lg:w-1/2 px-12 mb-12 lg:mb-0">
        <div class="max-w-xl lg:pr-16">
          <h2 class="mb-14 text-4xl md:text-6xl font-bold font-heading">


            <span>Наши контакты</span>
          </h2>
          <ul class="flex flex-col items-start">
            <li class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full">
              <span class="mr-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                  <g clip-path="url(#clip0)">
                    <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                  </g>
                  <defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clipPath></defs>
                </svg>
              </span>
              <p>Телефон +7(111) 111-1111 </p>
              
            </li>
            <li class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full">
              <span class="mr-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                  <g clip-path="url(#clip0)">
                    <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                  </g>
                  <defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clipPath></defs>
                </svg>
              </span>
              <p>Телефон +7(111) 111-1111 </p>
              
              
            </li>
            <li class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full">
              <span class="mr-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                  <g clip-path="url(#clip0)">
                    <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                  </g>
                  <defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clipPath></defs>
                </svg>
              </span>
              <p contenteditable="false">E-mail : sale@xxx.com</p>
            </li>
            <li class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full">
              <span class="mr-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                  <g clip-path="url(#clip0)">
                    <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                  </g>
                  <defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clipPath></defs>
                </svg>
              </span>
              <p>Адрес :&nbsp; Люберцы, Московская обл xxxx</p>
           
            </li>
            <li class="inline-flex items-center px-6 py-3 bg-white rounded-full">
              <span class="mr-6">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                  <g clip-path="url(#clip0)">
                    <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                  </g>
                  <defs><clipPath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clipPath></defs>
                </svg>
              </span>
            
              <p> Часы работы: пн-пт с 9.00 до 18.00</p>
            </li>
          </ul>
        </div>
      </div>
      <form method="POST" action="">
      <div class="lg:absolute lg:top-0 lg:bottom-0 lg:right-0 w-full lg:w-1/2 flex items-center justify-center py-20 px-12 bg-blue-300">
        <div class="absolute left-0 -ml-8 w-8 h-5/6 bg-blue-200"></div>
        <div class="relative text-center">
          <a class="inline-block mb-14" href="#">
            <img class="h-9" src="https://static.shuffle.dev/uploads/files/f2/f20dcd5d4776456584a55ced9bfcabc94668d189/logohead.png" alt="" contenteditable="false">
          </a>
          <h2 class="mb-5 text-4xl md:text-5xl text-white font-bold font-heading" contenteditable="false">Стать нашим партнером<br></h2>
         
          <div class="relative max-w-xl mx-auto bg-white rounded-lg">
            <img class="absolute top-0 right-0 h-40 -mt-12 -mr-20" src="yofte-assets/elements/quote-light.png" alt="">
            <div class="relative lg:max-w-xl lg:mx-auto bg-white rounded-lg">
              <div class="relative flex flex-wrap items-center justify-between">
                <div class="relative flex-1">
                  <span class="absolute top-0 left-0 ml-8 mt-4 font-semibold font-heading text-xs text-gray-400">Имя</span>
                  <input name="name" class="inline-block w-full pt-8 pb-4 px-8 placeholder-gray-300 border-0 focus:ring-transparent focus:outline-none rounded-md" type="text" placeholder="Иван Николаевич" required>
                </div>
              
              </div>
            </div>
            
          </div>
          <br>
          <div class="relative max-w-xl mx-auto bg-white rounded-lg">
            <img class="absolute top-0 right-0 h-40 -mt-12 -mr-20" src="yofte-assets/elements/quote-light.png" alt="">
            <div class="relative lg:max-w-xl lg:mx-auto bg-white rounded-lg">
              <div class="relative flex flex-wrap items-center justify-between">
                <div class="relative flex-1">
                  <span class="absolute top-0 left-0 ml-8 mt-4 font-semibold font-heading text-xs text-gray-400">Телефон</span>
                  <input name="phone" class="inline-block w-full pt-8 pb-4 px-8 placeholder-gray-300 border-0 focus:ring-transparent focus:outline-none rounded-md" type="text" placeholder="+7 123 123 12 12" required>
                </div>
              
              </div>
            </div>
            
          </div>
          <br>
          <div class="relative max-w-xl mx-auto bg-white rounded-lg">
            <img class="absolute top-0 right-0 h-40 -mt-12 -mr-20" src="yofte-assets/elements/quote-light.png" alt="">
            <div class="relative lg:max-w-xl lg:mx-auto bg-white rounded-lg">
              <div class="relative flex flex-wrap items-center justify-between">
                <div class="relative flex-1">
                  <span class="absolute top-0 left-0 ml-8 mt-4 font-semibold font-heading text-xs text-gray-400">e-mail</span>
                  <input name="email" class="inline-block w-full pt-8 pb-4 px-8 placeholder-gray-300 border-0 focus:ring-transparent focus:outline-none rounded-md" type="email" placeholder="steven@example.dev" required>
                </div>
              
              </div>
            </div>
            
          </div>
          <br>
          <button class="inline-block w-auto bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-6 px-8 rounded-md uppercase text-center">отправить</button>

        </div>
          </div>
      </form>
        </div>
      </div>
    

      
</section>