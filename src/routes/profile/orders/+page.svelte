<script>
    import {Username} from '$lib/stores.js';
    import {Countcart} from '$lib/stores.js';
  let email =''
  let password =''
  import { applyAction, deserialize, enhance } from '$app/forms';
  export async function login() {
    const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: email,
              password: password
          })
      });
  
      const data = deserialize(await response.text());
      if (!data.error) {
          let userid = localStorage.getItem('userid');
          if (userid) {
              const res = await fetch('/api/cart', {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      userid: userid,
                      newuserid: data.userid
                  })
              });
  
      
    const cart = await fetch('/api/cart?userid='+data.userid);
    const cartjson =  await cart.json();
    $: Countcart.set(cartjson.count);
    window.location.href = '/profile/order/';
  
          }
          localStorage.setItem('token', data.token);
          localStorage.setItem('userid', data.userid);

  
      } else {
          alert(data.error);
  
      }
   
  }
  let auth = false;
  if ($Username) {
      auth = true;
  }
  
  export async function user() {
    let user = $Username
    return user;
  }
  
  user();
  
  export async function logout() {
    const response = await fetch('/api/auth/logout');
    const data = await response.json();
  
    if (data.data == 'ok') {
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
  
      window.location.href = '/';
      console.log(data);
    }
  }
  </script>
  {#await user()}
    <div>Загрузка...</div>
  {:then user}
  {#if auth}
  
  <section class="relative py-20 md:pt-32 overflow-x-hidden"><img class="absolute h-24 md:h-auto top-0 left-0 right-0" src="yofte-assets/elements/line-top.svg" alt=""><div class="relative container px-4 mx-auto">
  
    <div class="flex xl:hidden items-center mb-20">
      <a class="flex items-center justify-center w-12 h-12 mr-5 bg-orange-300 hover:bg-orange-400 rounded-md" href="#">
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.02344 5.99748L7.14844 10.1225L5.97043 11.3008L0.66742 5.99748L5.97043 0.694179L7.14844 1.87248L3.02344 5.99748Z" fill="white"></path></svg></a>
      <a class="flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md" href="#">
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.97656 6.00252L0.851562 1.87752L2.02957 0.699219L7.33258 6.00252L2.02957 11.3058L0.851562 10.1275L4.97656 6.00252Z" fill="white"></path></svg></a>
    </div>
    <div class="relative max-w-4xl mx-auto">
  
  
      <div class="absolute inset-0 bg-blue-200 my-8 -ml-6 -mr-6"></div>
      <div class="relative mx-auto mb-20 py-12 md:py-28 bg-blue-300">
        <img class="w-32 h-32 mb-10 mx-auto rounded-full" src="yofte-assets/images/placeholder-portrait.png" alt=""><div class="relative max-w-2xl px-4 mx-auto">
        <div class="max-w-md mx-auto px-4">
          <h3 class="mb-2 text-2xl font-bold font-heading text-white" contenteditable="false">{$Username}</h3>
          <p class="mb-2 text-2xl font-bold font-heading text-white" contenteditable="false">Login: test1</p>
          <p class="mb-2 text-2xl font-bold font-heading text-white" contenteditable="false">Email: test1@test.ru</p>

        </div>
  
        <div class="max-w-md mx-auto px-4">
          <h3 class="mb-16 text-2xl font-bold font-heading text-white" contenteditable="false">Tonight I had interdum at ante porta, eleifend feugiat nunc. In semper euismod mi a accumsan. Thaaank you! 👏💥</h3>

        </div>
        </div>
      </div>
    </div>
    <div class="text-center"><a class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-5 px-8 rounded-md uppercase" href="#" contenteditable="false">Редактировать профиль</a></div>

  
    <div class="text-center"><button on:click={logout} class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-5 px-8 rounded-md uppercase" contenteditable="false">Выход</button></div>
  
    </div>
    
  </section>
  {:else}
  
  
  
  <div class="antialiased bg-body text-body font-body">
      <div class="">
                  <section class="py-20 bg-gray-100 overflow-x-hidden">
      <div class="relative container px-4 mx-auto">
        <div class="absolute inset-0 bg-blue-200 my-24 -ml-4"></div>
        <div class="relative flex flex-wrap bg-white">
          <div class="w-full md:w-4/6 px-4">
            <div class="lg:max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
              <a class="inline-block mb-14 text-3xl font-bold font-heading" href="#"><img src="/images/yofte-logo.svg" alt="" width="100"></a>
              <h3 class="mb-8 text-4xl md:text-5xl font-bold font-heading">Вход
    </h3>
              
              <form class="flex flex-wrap -mx-4" action="">
                <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                  <label for="">
                    <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Ваш E-MAIL</h4>
          <input class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="email" bind:value={email} >
                  </label>
                </div>
                <div class="w-full md:w-1/2 px-4 mb-12">
                  <label for="">
                    <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Пароль</h4>
                    <input bind:value={password} class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="password">
                  </label>
                </div>
                <div class="w-full px-4 mb-12" for="">
                  
                </div>
                <div class="w-full px-4">
                  <button on:click={login} class="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase" >ВХОД</button>
                </div>
              </form>
            </div>
          </div>
          <div class="w-full md:w-2/6 h-128 md:h-auto flex items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat" style="background-image: url('/images/baner2.png');">
            <div>
              <div class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full">
                <span class="mr-6">
                  <svg width="36" height="36" viewbox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                    <g clip-path="url(#clip0)">
                      <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                    </g>
                    <defs><clippath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clippath></defs>
                  </svg>
                </span>
                <p>Регистрация
    </p>
              </div>
              <div class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full">
                <span class="mr-6">
                  <svg width="36" height="36" viewbox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                    <g clip-path="url(#clip0)">
                      <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                    </g>
                    <defs><clippath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clippath></defs>
                  </svg>
                </span>
                <p>Восстановить пароль
    </p>
              </div>
              <div class="inline-flex items-center px-6 py-3 bg-white rounded-full">
                <span class="mr-6">
                  <svg width="36" height="36" viewbox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                    <g clip-path="url(#clip0)">
                      <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                    </g>
                    <defs><clippath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clippath></defs>
                  </svg>
                </span>
                <p>Обратиться в службу поддержки
    </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
  </div>
  
  {/if}
  {/await}