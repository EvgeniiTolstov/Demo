<script>
	import { page } from '$app/stores';
	export let data;
	let pageSize = 10;
	let totalItems = data.users.data.count;
	let totalPages = Math.ceil(totalItems / pageSize);
	
</script>

<h1>Users</h1>
{#each data.users.data.rows as user}
	<p>{user.id} - {user.title}</p>
{/each}
<div class="pagination">
	{#each Array(totalPages) as _, idx}
		<a
			href="/dzc/users?limit={pageSize}&offset={pageSize * idx}"
			>
			{idx + 1}
		</a>
		
	{/each}
</div>