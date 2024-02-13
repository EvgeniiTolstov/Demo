import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const offset = Number(url.searchParams.get('offset')) || 0;

	async function getUsers(limit=10, offset = 0) {
		if (limit > 100) {
			throw error(400, 'Bad Request');
		}
		const res = await fetch(`/api/v1/product_list/?section=kamaz&limit=${limit}&offset=${offset}`);
		const data = await res.json();
		return data;
	}

	return {
		users: getUsers(limit, offset)
	};
}