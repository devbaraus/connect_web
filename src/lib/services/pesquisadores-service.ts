import type { Researcher } from '$lib/types';
import {PUBLIC_API_URL} from '$env/static/public'

type SearchResearchers = {
	query?: string;
	page?: number;
	perPage?: number;
};

type PaginatedResponse<T> = {
	results: T[];
	total: number;
	per_page: number;
	page: number;
}

export async function listPesquisadores({ query, page, perPage }: SearchResearchers): Promise<PaginatedResponse<Researcher>> {
	const url = new URL('v1/pesquisadores', PUBLIC_API_URL);
	url.searchParams.append('query', query ?? '');
	url.searchParams.append('page', (page ?? 0).toString());
	url.searchParams.append('per_page', (perPage ?? 10).toString());


	const response = await fetch(url.toString())
	return await response.json();
}

export async function getPesquisador(siape: string): Promise<Researcher> {
	const url = new URL(`v1/pesquisadores/${siape}`, PUBLIC_API_URL);
	const response = await fetch(url.toString())
	return await response.json();
}