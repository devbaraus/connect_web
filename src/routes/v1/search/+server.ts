import { PUBLIC_MEILI_KEY, PUBLIC_MEILI_URL } from '$env/static/public';
import { MeiliSearch } from 'meilisearch';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const meiliClient = new MeiliSearch({
	host: PUBLIC_MEILI_URL,
	apiKey: PUBLIC_MEILI_KEY
})

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query') ?? '';
	try {
		const index = await meiliClient.index('lattes')
		const data = await index.search(query, { limit: 10 });
		return new Response(JSON.stringify(data));
	} catch (e) {
		console.log(e)
		error(500, 'MeiliSearch error');
	}
};

