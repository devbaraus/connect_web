
import type { ProducoesChartData } from '$lib/types';
import type { operations } from '$lib/types/api';
import { PUBLIC_API_URL } from '$env/static/public';
import { client } from '.';
import type { ClientOptions } from 'openapi-fetch';

export const GeneralService = {
	grandeAreas: async (
		filters: operations['routes_api_get_grande_areas']['parameters']['query'] = {},
		config?: ClientOptions
	) => {
		const response = await client.GET('/v1/grande_area', {
			params: {
				query: filters
			},
			config
		});
		return response.data
	},
	area: async (
		filters: operations['routes_api_get_areas']['parameters']['query'] = {},
		config?: ClientOptions
	) => {
		const response = await client.GET('/v1/area', {
			params: {
				query: filters
			},
			config
		});
		return response.data
	},
	campus: async () => {
		const url = new URL(`v1/campus`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
	formacaoesChart: async (
		filters: operations['routes_api_formacao_stats']['parameters']['query'],
		config?: ClientOptions
	) => {
		const response = await client.GET('/v1/formacoes/stats', {
			params: {
				query: {
					...filters,
					exibir_por: filters?.exibir_por ?? 'data'
				}
			},
			config
		})
		return response.data
	},
	producoesChart: async (
		filters: operations['routes_api_producao_bibliografica_stats']['parameters']['query'],
		config?: ClientOptions
	) => {
		const response = await client.GET('/v1/producoes/stats', {
			params: {
				query: {
					...filters,
					display_by: filters?.display_by ?? 'data',
					kind: filters?.kind ?? 'tipo'
				}
			},
			config
		});
		return response.data
	}
}
