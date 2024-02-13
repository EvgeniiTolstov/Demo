<script>
  import { goto } from '$app/navigation';


let search = '';
export let data

export function searchok() {
	if (search == '') {
		goto('/search');
	} else {
		goto('/search?search=' + search);
	}
	
}

</script>
<section class="py-20 bg-gray-100">
	<div class="container mx-auto px-4">
<div class="container">
	
	<div class="hidden xl:inline-block mr-14"><input bind:value={search} class="py-5 px-8 w-full placeholder-gray-400 text-xs uppercase font-semibold font-heading bg-gray-50 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text" placeholder="Поиск"></div>
	<div class="xl:hidden"><input class="py-5 px-8 w-full placeholder-gray-400 text-xs uppercase font-semibold font-heading bg-gray-50 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text" placeholder="Поиск"></div>
	<div class="hidden xl:inline-block"><button  on:click={searchok} class="py-5 px-8 w-full text-xs uppercase font-semibold font-heading bg-blue-500 text-white border border-blue-500 focus:ring-blue-300 focus:border-blue-300 rounded-md">Искать</button></div>
	<div class="xl:hidden"><button on:click={searchok}  class="py-5 px-8 w-full text-xs uppercase font-semibold font-heading bg-blue-500 text-white border border-blue-500 focus:ring-blue-300 focus:border-blue-300 rounded-md">Искать</button></div>

</div>
<br>
<div class="w-full lg:w-4/4 px-3">
	<div class="flex flex-wrap -mx-3">
	  {#each data.product as product}
	 
	  <div class="w-full sm:w-1/2 md:w-1/3 px-3 mb-8">
		<div class="p-6 bg-gray-50">
		  <span class="px-2 py-1 text-xs font-bold font-heading border-2 border-red-500 rounded-full text-red-500 bg-white">Артикул: {product.article}</span>
		  <a class="block px-6 mt-6 mb-2" href="catalog/{product.section}/{product.id}">
			<img class="mb-5 mx-auto h-56 w-full object-contain" src="/api/files/read?folder=/&file={product.image}&width=200&height=250" alt="">
			<h3 class="mb-2 text-xl font-bold font-heading">{product.title}</h3>
			<p class="text-lg font-bold font-heading text-blue-500">
				<span>
					{#if product.price}
					{product.price} руб.
					{:else}
					Цену уточните у менеджера
					{/if}
				  </span>
			 
			</p>
		  </a>
		 
		</div>
	  </div>
	  {/each}

	</div>
  </div>
	</div> 		
</section>