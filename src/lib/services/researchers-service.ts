type SearchResearchers = {
	query?: string;
	page?: number;
	perPage?: number;
};
export async function searchResearchers({ query, page, perPage }: SearchResearchers) {
	const url = new URL('http://localhost:8000/v1');
	url.searchParams.append('query', query ?? '');
	url.searchParams.append('page', (page ?? 0).toString());
	url.searchParams.append('per_page', (perPage ?? 10).toString());


	const response = await fetch(url.toString())
	return await response.json();
}