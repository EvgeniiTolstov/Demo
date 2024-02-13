<script>
  import { Username } from "$lib/stores.js";
  import { Countcart } from "$lib/stores.js";
  let email = "";
  let password = "";
  let fio = "";
  let phone = "";
  let inn = "";

  import { applyAction, deserialize, enhance } from "$app/forms";
  export let data;
  export let form;

  export async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = deserialize(await response.text());

    if (!data.error) {
      let userid = localStorage.getItem("userid");
      if (userid) {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: userid,
            newuserid: data.userid,
          }),
        });
        const data2 = deserialize(await res.text());

        const cart = await fetch("/api/cart?userid=" + data.userid);
        const cartjson = await cart.json();
        $: Countcart.set(cartjson.count);

        window.location.href = "/profile";
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.userid);
    } else {
      alert(data.error);
    }
  }
  let auth = false;
  if ($Username) {
    auth = true;
  }

  export async function user() {
    let user = $Username;
    return user;
  }

  user();

  export async function logout() {
    const response = await fetch("/api/auth/logout");
    const data = await response.json();

    if (data.data == "ok") {
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      window.location.href = "/";
      console.log(data);
    }
  }
</script>

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
                  <a
                    class="inline-block mb-14 text-3xl font-bold font-heading"
                    href="#"
                    ><img src="/images/yofte-logo.svg" alt="" width="100" /></a
                  >
                  <h3 class="mb-8 text-4xl md:text-5xl font-bold font-heading">
                    {$Username}
                  </h3>

                  <form class="flex flex-wrap -mx-4" method="POST">
                    <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                      <label for="">
                        <h4
                          class="mb-5 text-gray-400 uppercase font-bold font-heading"
                        >
                          ФИО
                        </h4>
                        <input
                          name="name"
                          class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="text"
                          value={data.findUser.name}
                        />
                      </label>
                    </div>
                    <div class="w-full md:w-1/2 px-4 mb-12">
                      <label for="">
                        <h4
                          class="mb-5 text-gray-400 uppercase font-bold font-heading"
                        >
                          ИНН
                        </h4>
                        <input
                          value={data.findUser.inn}
                          name="inn"
                          class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="text"
                        />
                      </label>
                    </div>
                    <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                      <label for="">
                        <h4
                          class="mb-5 text-gray-400 uppercase font-bold font-heading"
                        >
                          E-MAIL
                        </h4>
                        <input
                          name="email"
                          class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="email"
                          value={data.findUser.email}
                        />
                      </label>
                    </div>
                    <div class="w-full md:w-1/2 px-4 mb-12">
                      <label for="">
                        <h4
                          class="mb-5 text-gray-400 uppercase font-bold font-heading"
                        >
                          Телефон
                        </h4>
                        <input
                          name="phone"
                          value={data.findUser.phone}
                          class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="text"
                        />
                      </label>
                    </div>
                    <div class="w-full px-4 mb-12" for=""></div>
                    <div class="w-full px-4">
                      <button
                        on:click={login}
                        class="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase"
                        >Сохранить</button
                      >
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="w-full md:w-2/6 h-128 md:h-auto flex items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat"
                style="background-image: url('/images/baner2.png');"
              >
                <div>
                  <div
                    class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full"
                  >
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
                    <p>Написать мэнеджеру</p>
                  </div>
                  <div
                    class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full"
                  >
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
                    <p>Заказы</p>
                  </div>
                  <div
                    class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full"
                  >
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
                    <p>Изменить пароль</p>
                  </div>
                  <div
                    class="inline-flex items-center px-6 py-3 bg-white rounded-full"
                  >
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
                  <a
                    class="inline-block mb-14 text-3xl font-bold font-heading"
                    href="#"
                    ><img src="/images/yofte-logo.svg" alt="" width="100" /></a
                  >
                  <h3 class="mb-8 text-4xl md:text-5xl font-bold font-heading">
                    Вход
                  </h3>

                  <form class="flex flex-wrap -mx-4" action="">
                    <div class="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                      <label for="">
                        <h4
                          class="mb-5 text-gray-400 uppercase font-bold font-heading"
                        >
                          Ваш E-MAIL
                        </h4>
                        <input
                          class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="email"
                          bind:value={email}
                        />
                      </label>
                    </div>
                    <div class="w-full md:w-1/2 px-4 mb-12">
                      <label for="">
                        <h4
                          class="mb-5 text-gray-400 uppercase font-bold font-heading"
                        >
                          Пароль
                        </h4>
                        <input
                          bind:value={password}
                          class="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="password"
                        />
                      </label>
                    </div>
                    <div class="w-full px-4 mb-12" for=""></div>
                    <div class="w-full px-4">
                      <button
                        on:click={login}
                        class="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase"
                        >ВХОД</button
                      >
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="w-full md:w-2/6 h-128 md:h-auto flex items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat"
                style="background-image: url('/images/baner2.png');"
              >
                <div>
                  <div
                    class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full"
                  >
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
                    <a href="/profile/signup">Регистрация </a>
                  </div>
                  <div
                    class="inline-flex items-center mb-2 px-6 py-3 bg-white rounded-full"
                  >
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
                    <a href="/profile/forgot">Восстановить пароль </a>
                  </div>
                  <div
                    class="inline-flex items-center px-6 py-3 bg-white rounded-full"
                  >
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
                    <a href="/profile/support"
                      >Обратиться в службу поддержки
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
