
import{writable} from 'svelte/store';
import { browser } from "$app/environment";



export const Usernid = writable(browser && (localStorage.getItem('userid')))
export const Countcart = writable(0)
export const Addresscontract = writable('')
export const Countwishlist = writable(0)
export const Username = writable('')
export const SortOrder = writable(browser && (localStorage.getItem('sort')) || 'order_by=id&order=ASC')
export const SortNetwork = writable('')
export const SortCryptoCurrency = writable('')
export const SortCurrency = writable('')
export const SortType = writable('')
export const SortBank = writable('')
export const SortMin = writable('')
export const Loader = writable('')


export const SortLimit = writable(browser && (localStorage.getItem('limit')) || 10)
//Usernid.subscribe((value) => browser && localStorage.setItem('userid', value))
