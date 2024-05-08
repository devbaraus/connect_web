import type { operations } from '$lib/types/api';
import type { ClientOptions } from 'openapi-fetch';
import { client } from '.';

export const PesquisadoresService = {
	metrics: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/metricas', {
			params: {
				path: {
					siape
				}
			},
			signal: config?.signal
		});
		return response.data;
	},
	list: async (
		filters: operations['routes_pesquisadores_search_researcher']['parameters']['query'],
		config?: ClientOptions
	) => {
		const response = await client.GET('/v1/pesquisadores', {
			params: {
				query: filters
			},
			config
		});
		return response.data;
	},
	get: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	producoesTecnicasStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes_tecnicas/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	producoesTecnicas: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes_tecnicas', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	producoesTecnicasGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes_tecnicas/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	producoesBibliograficas: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	producoesBibliograficasGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	producoesBibliograficasStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/producoes/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	formacoes: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/formacoes', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	formacoesGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/formacoes/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	bancas: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/bancas', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	bancasStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/bancas/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	bancasGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/bancas/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	projetosPesquisa: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/projetos_pesquisa', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	projetosPesquisaStats: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/projetos_pesquisa/stats', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	},
	projetosPesquisaGraph: async (siape: string, config?: RequestInit) => {
		const response = await client.GET('/v1/pesquisadores/{siape}/projetos_pesquisa/graph', {
			params: {
				path: {
					siape
				}
			},
			config
		});
		return response.data;
	}
};
