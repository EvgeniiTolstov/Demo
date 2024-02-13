<script>
	import '../../app.css';
	import Leftbar from "$lib/Leftbar.svelte"
	import Mobilemenu from "$lib/Mobilemenu.svelte"
  import CollectionHeader from '$lib/header/CollectionHeader.svelte';
  import { goto } from '$app/navigation';
    export let data;
    let auth = false;
  
    let user = data.findUser.username;

    if (user) {
        auth = true;
       
    }
  
   // если не авторизован, то перенаправить на страницу авторизации
    if (auth === false) {
       goto('/');
        //console.log('goto');
    }

    // если в массиве data.groups_id нет 1, то перенаправить на страницу авторизации
 console.log('data.groups_id',data);
    if (data.groups_id.indexOf(1) === -1) {
        goto('/');
    }else{
      console.log('admin');
    }
</script>
<div class="app">
 
    <CollectionHeader/>

        <div class="wrapper">
    
            <div class="main-container">
               
                <div class="content-wrapper">
    <main>
        <slot></slot>
    </main>
    
    <footer>
    
    </footer>
                </div>
            </div>
    </div>
        <div class="overlay-app"></div>
    </div>
