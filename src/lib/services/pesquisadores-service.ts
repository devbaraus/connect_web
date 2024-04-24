import { PUBLIC_API_URL } from '$env/static/public';
import type { FormacaoStatsData, Link, NodeCurriculo, NodeProducaoBibliografica, PesquisadoresQuery, ProducoesChartData, Researcher } from '$lib/types';
import type { ClientOptions } from 'openapi-fetch';
import { client } from '.';

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
	}: SearchResearchers, config?: ClientOptions) => {
		const response = await client.GET('/v1/pesquisadores', {
			signal: config?.signal,
		})
		return response.data
	},
	get: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	producoesTecnicasStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes_tecnicas/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	producoesTecnicas: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes_tecnicas', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	producoesTecnicasGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes_tecnicas/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	producoesGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	producoesChart: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	formacoes: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/formacoes', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	formacoesGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/formacoes/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	bancas: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/bancas', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	bancasStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/bancas/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	bancasGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/bancas/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	projetosPesquisa: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/projetos_pesquisa', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	projetosPesquisaStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/projetos_pesquisa/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	projetosPesquisaGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/projetos_pesquisa/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		})
		return response.data
	},
	areasConhecimento: async (siape: string, config?: RequestInit): Promise<PesquisadorAreasConhecimento> => {
		const url = new URL(`v1/pesquisadores/${siape}/areas_conhecimento`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	},
	palavrasChave: async (siape: string, config?: RequestInit): Promise<string[]> => {
		const url = new URL(`v1/pesquisadores/${siape}/palavras_chave`, PUBLIC_API_URL);
		const response = await fetch(url.toString(), config);
		return await response.json();
	}
};
