<script>
    import Collectionmenu from "$lib/Collectionmenu.svelte";
    export let data
    console.log(data.mdata)
	async function handleClick(event) {
		console.log("clicked", event.target.id);
		// fetch('/manager', {
		// 	method: 'DELETE',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		"model": event.target.id
		// 	})
		// })
		// location.reload()
		const response = await fetch('/manager', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"model": event.target.id
			})
		})
		const json = await response.json()
		console.log(json)
		//если таблица удалена то перезагружаем страницу
	
			location.reload()
		

	
	}
</script>
<Collectionmenu/>

<div class="content-section">

<div class="relative rounded-xl overflow-auto p-8">
	<ul>
	
{#each  data.mdata as item }
      
        <li class="adobe-product">
			<div class="products"> {item.id} -
			
				{item.models} 
			</div>
			<span class="status">
        <span class="status-circle green"></span>
        Active</span>
			<div class="button-wrapper">
				<!-- <button class="content-button status-button open">Open</button> -->
                <a class="content-button status-button open" href="/collection/detail/{item.models}/">Open & Add data</a>
				<a class="content-button status-button open" href="/collection/add/{item.models}/">Edit</a>
				<a target="_blank" class="content-button status-button open" href="/api/v1/{item.models}/">Viev api</a>
				<button on:click={handleClick} class="content-button status-button open" id="{item.models}">Del</button>
			</div>
		</li>
    
{/each }
    </ul>
</div>
</div>


