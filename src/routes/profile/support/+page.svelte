<script>
    import {Username} from '$lib/stores.js';
    import {Countcart} from '$lib/stores.js';


    export let form
    export let data
console.log('form', form?.body.message)
  let message = ''
  if (form?.body.message) {
    message = form?.body.message
  }
  let email =''
  let password =''
  let checkpassword1 = false //проверка на цыфры
  let checkpassword2 = false //проверка на буквы также и кирилицу
  let checkpassword3 = false //проверка на длину пароля больше 6
  let checkpassword4 = false //проверка на совпадение паролей
  let checkpassword5 = false //проверка на все совпадения
  let confirmpasswd = ''
  let show_password = true
$: type = show_password ? 'password' : 'text'
let value = '';

function onInput (event) {
	value = event.target.value
  password = value
}
  let fio =''
  let phone =''
  let inn =''
  import { browser, building, dev, version } from '$app/environment';
  import { applyAction, deserialize, enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  




  console.log('browser', enhance);
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
     // console.log('data1', data);
      //если нет ошибок
      if (!data.error) {
          //получаем текущий userid из localStorage, если он есть, выбераем по нему данные в таблице cart и обновляем их с новым userid
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
              const data2 = deserialize(await res.text());
              //console.log('data2', data2);
  
       
    const cart = await fetch('/api/cart?userid='+data.userid);
    const cartjson =  await cart.json();
    $: Countcart.set(cartjson.count);
    // перезагружаем страницу
    window.location.href = '/profile';
  
          }
          localStorage.setItem('token', data.token);
          localStorage.setItem('userid', data.userid);
         // window.location.href = '/dzc/profile';
  
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
  
    //если ответ ok
    if (data.data == 'ok') {
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
  
      window.location.href = '/';
      console.log(data);
    }
  }
 
  </script>

{message}

  {#await user()}
    <div>Загрузка...</div>
  {:then user}
  {#if auth}

  <div class="antialiased bg-body text-body font-body">
    <div class="">
                <section class="py-20 bg-gray-100 overflow-x-hidden">
    <div class="relative container px-4 mx-auto">
      <div class="absolute inset-0 bg-blue-200 my-24 -ml-4"></div>
      <div class="relative flex flex-wrap bg-white">
        <div class="w-full md:w-4/6 px-4">
          <div class="lg:max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
            <a class="inline-block mb-14 text-3xl font-bold font-heading" href="#"><img src="/images/yofte-logo.svg" alt="" width="100"></a>
            <h3 class="mb-8 text-2xl md:text-5xl font-bold font-heading">Обращение в службу поддержки
  </h3>
  {$Username}
  <form class="flex flex-wrap -mx-4"  method="POST">
    <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
      <label>
        <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Имя</h4>
       <input name="username" class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"  required>
      </label>
    </div>
    <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
      <label>
        <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Ваш E-MAIL</h4>
       <input name="email" class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="email"  required>
      </label>
    </div>
    <div class="w-full md:w-1/1 px-4 mb-8 md:mb-12">
      <label>
        <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Обращение</h4>
       <input name="message" class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="textrea"  required>
      </label>
    </div>
 

    <div class="w-full px-4">
      <button class="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase" >Отправить</button>
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
              <p>Изменить пароль
  </p>
            </div>
            <div  class="inline-flex items-center px-6 py-3 bg-white rounded-full">
              <span class="mr-6">
                <svg width="36" height="36" viewbox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="18" fill="#A692FF"></circle>
                  <g clip-path="url(#clip0)">
                    <path d="M15.135 24.3373L9 18.2023L9.81024 17.392L15.135 22.7168L26.1898 11.6621L27 12.4724L15.135 24.3373Z" fill="white"></path>
                  </g>
                  <defs><clippath id="clip0"><rect width="18" height="18" fill="white" transform="translate(9 9)"></rect></clippath></defs>
                </svg>
              </span>
              <button on:click={logout}>Выход</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  </div>
  
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
              <h3 class="mb-8 text-4xl md:text-5xl font-bold font-heading">Служба поддержки
                </h3>
              
              <form class="flex flex-wrap -mx-4"  method="POST">
                <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                  <label>
                    <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Имя</h4>
                   <input name="username" class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text"  required>
                  </label>
                </div>
                <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                  <label>
                    <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Ваш E-MAIL</h4>
                   <input name="email" class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="email"  required>
                  </label>
                </div>
                <div class="w-full md:w-1/1 px-4 mb-8 md:mb-12">
                  <label>
                    <h4 class="mb-5 text-gray-400 uppercase font-bold font-heading">Обращение1</h4>
                   <input name="message" class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="textrea"  required>
                  </label>
                </div>
             
        
                <div class="w-full px-4">
                  <button class="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase" >Отправить</button>
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
                <a href="/profile/signup">Регистрация
              </a>
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
                <a href="/profile/forgot">Восстановить пароль
                </a>
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