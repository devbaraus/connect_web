import type { operations } from '$lib/types/api';
import { client } from '.';

export const ProducoesBibliograficasService = {
	list: async (
		filters: operations['routes_producoes_bibliograficas_list']['parameters']['query'] = {},
		config?: RequestInit
	) => {
		const response = await client.GET('/v1/producoes_bibliograficas', {
			params: {
				query: filters
			},
			config
		});
		return response.data;
	},
	stats: async (
		filters: operations['routes_producoes_bibliograficas_stats']['parameters']['query'],
		config?: RequestInit
	) => {
		const response = await client.GET('/v1/producoes_bibliograficas/stats', {
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
};
