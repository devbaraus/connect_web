import type { FormacaoStatsData, PaginatedResponse, ProducoesChartData, Researcher } from '$lib/types';
import { PUBLIC_API_URL } from '$env/static/public';

type SearchResearchers = {
	query?: string;
	page?: number;
	perPage?: number;
};



export const PesquisadoresService = {
	list: async ({
		query,
		page,
		perPage
	}: SearchResearchers): Promise<PaginatedResponse<Researcher>> => {
		const url = new URL('v1/pesquisadores', PUBLIC_API_URL);
		url.searchParams.append('query', query ?? '');
		url.searchParams.append('page', (page ?? 0).toString());
		url.searchParams.append('per_page', (perPage ?? 10).toString());

		const response = await fetch(url.toString());
		return await response.json();
	},
	get: async (siape: string): Promise<Researcher> => {
		const url = new URL(`v1/pesquisadores/${siape}`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return await response.json();
	},
	producoesChart: async (siape: string): Promise<ProducoesChartData[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/producoes/stats`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return await response.json();
	},
	formacaoStats: async (siape: string): Promise<FormacaoStatsData[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/formacoes`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return await response.json();
	}
};
