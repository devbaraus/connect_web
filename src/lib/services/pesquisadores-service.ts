import type { FormacaoStatsData, PaginatedResponse, ProducoesChartData, Researcher } from '$lib/types';
import { PUBLIC_API_URL } from '$env/static/public';

type SearchResearchers = {
	query?: string;
	page?: number;
	perPage?: number;
};

type PesquisadorAreasConhecimento = {
	grandes_areas: string[];
	areas: string[];
	subareas: string[];
	especialidades: string[];

}



export const PesquisadoresService = {
	list: async ({
		query,
		page,
		perPage: pageSize
	}: SearchResearchers): Promise<PaginatedResponse<Researcher>> => {
		const url = new URL('v1/pesquisadores', PUBLIC_API_URL);
		url.searchParams.append('query', query ?? '');
		url.searchParams.append('page', (page ?? 0).toString());
		url.searchParams.append('page_size', (pageSize ?? 10).toString());

		const response = await fetch(url.toString());
		return await response.json();
	},
	chart: async (
		filters: {
			campus?: string | null;
			grandeArea?: string | null;
			area?: string | null;
			exibirPor?: string | null;
		},
		config?: {
			signal?: AbortSignal;
		}
	) => {
		const url = new URL(`v1/pesquisadores/formacao/stats`, PUBLIC_API_URL);
		if (filters.campus) url.searchParams.append('campus', filters.campus);
		if (filters.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		if (filters.area) url.searchParams.append('area', filters.area);
		url.searchParams.append('exibir_por', filters.exibirPor ?? 'data');

		const response = await fetch(url.toString(), {
			signal: config?.signal
		});

		return (await response.json()) as ProducoesChartData[];
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
	formacoes: async (siape: string): Promise<FormacaoStatsData[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/formacoes`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return await response.json();
	},
	areasConhecimento: async (siape: string): Promise<PesquisadorAreasConhecimento> => {
		const url = new URL(`v1/pesquisadores/${siape}/areas_conhecimento`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return await response.json();
	},
	palavrasChave: async (siape: string): Promise<string[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/palavras_chave`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return await response.json();
	}
};
