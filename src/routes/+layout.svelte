<script>
  import "$lib/templates/dzc/app.css";
  import { browser, building, dev, version } from "$app/environment";
  import Header from "$lib/templates/dzc/Header.svelte";
  import Footer from "$lib/templates/dzc/Footer.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";

 
import {Usernid, Countcart, Username, Countwishlist} from '$lib/stores.js';


export let data;

const user = writable();
const userid = writable();



$: user.set(data.findUser.username);
$: userid.set(data.userid_cookies);



setContext('user', user);
setContext('userid', userid);

if (browser) {

if (data.findUser.username == false) {


   localStorage.setItem('userid', data.userid_cookies);

} else {
  localStorage.setItem('userid', data.findUser.user_id);
  $Username = data.findUser.username;
}
}

console.log('$Usernid',$Usernid);
export async function cart(){
if ($Usernid){
const cart = await fetch('/api/cart?userid='+$Usernid);
const cartjson =  await cart.json();
$: Countcart.set(cartjson.data.count);
return cartjson;
} else {
  return [];
}

}
cart();

export async function wishlist(){
if ($Usernid){
const wishl = await fetch('/api/wishlist?userid='+$Usernid);
const wishljson =  await wishl.json();
$: Countwishlist.set(wishljson.data.count);
return wishljson;
} else {
  return [];
}

}
wishlist();

</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>

  <Footer />
</div>
