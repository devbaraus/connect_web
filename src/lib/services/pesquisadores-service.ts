import { PUBLIC_API_URL } from '$env/static/public';
import type { FormacaoStatsData, Link, NodeCurriculo, NodeProducaoBibliografica, PesquisadoresQuery, ProducoesChartData, Researcher } from '$lib/types';

type SearchResearchers = {
	query?: string;
	page?: number;
	pageSize?: number;
};

type PesquisadorAreasConhecimento = {
	grandes_areas: string[];
	areas: string[];
	subareas: string[];
	especialidades: string[];
}

type Node = NodeProducaoBibliografica | NodeCurriculo;

export const PesquisadoresService = {
	list: async ({
		query,
		page,
		pageSize: pageSize
	}: SearchResearchers, config?: RequestInit): Promise<PesquisadoresQuery> => {
		const url = new URL('v1/pesquisadores', PUBLIC_API_URL);
		url.searchParams.append('query', query ?? '');
		url.searchParams.append('page', (page ?? 1).toString());
		url.searchParams.append('page_size', (pageSize ?? 10).toString());

		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	get: async (siape: string, config?: RequestInit): Promise<Researcher> => {
		const url = new URL(`v1/pesquisadores/${siape}`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	producoesGraph: async (siape: string,config?: RequestInit): Promise<{ nodes: Node[]; links: Link[] }> => {
		const url = new URL(`v1/pesquisadores/${siape}/producoes/graph`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	producoesChart: async (siape: string,config?: RequestInit): Promise<ProducoesChartData[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/producoes/stats`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	formacoes: async (siape: string,config?: RequestInit): Promise<FormacaoStatsData[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/formacoes`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	areasConhecimento: async (siape: string,config?: RequestInit): Promise<PesquisadorAreasConhecimento> => {
		const url = new URL(`v1/pesquisadores/${siape}/areas_conhecimento`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	palavrasChave: async (siape: string,config?: RequestInit): Promise<string[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/palavras_chave`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	}
};
