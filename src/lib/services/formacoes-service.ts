import type { operations } from "$lib/types/api"
import { client } from "."

export const FormacoesService = {
    stats: async (
		filters: operations['routes_formacoes_stats']['parameters']['query'],
		config?: RequestInit
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
}