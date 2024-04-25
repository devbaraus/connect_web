
import type { operations } from '$lib/types/api';
import { client } from '.';

export const GeneralService = {
	grandeAreas: async (
		filters: operations['routes_api_get_grande_areas']['parameters']['query'] = {},
		config?: RequestInit
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
		config?: RequestInit
	) => {
		const response = await client.GET('/v1/area', {
			params: {
				query: filters
			},
			config
		});
		return response.data
	},
	campus: async (config?: RequestInit) => {
		const response = await client.GET('/v1/campus', {
			signal: config?.signal
		});
		return response.data
	},
	
	
}
