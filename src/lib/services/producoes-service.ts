import { PUBLIC_API_URL } from '$env/static/public';
import type { PaginatedResponse, ProducoesChartData, ProducoesData } from '$lib/types';

export const ProducoesService = {

	list: async (filters: {
		campus?: string | null;
		grandeArea?: string | null;
		area?: string | null;
		tipos?: string[] | null;
		anoLte?: number | null;
		anoGte?: number | null;
		page?: number;
		pageSize?: number;
	}) => {
		const url = new URL(`v1/producoes`, PUBLIC_API_URL);
		if (filters.campus) url.searchParams.append('campus', filters.campus);
		if (filters.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		if (filters.area) url.searchParams.append('area', filters.area);
		if (filters.page) url.searchParams.append('page', filters.page.toString());
		if (filters.pageSize) url.searchParams.append('page_size', filters.pageSize.toString());
		if (filters.tipos) url.searchParams.append('tipos', filters.tipos.join(','));
		if (filters.anoLte) url.searchParams.append('ano_lte', filters.anoLte.toString());
		if (filters.anoGte) url.searchParams.append('ano_gte', filters.anoGte.toString());

		const response = await fetch(url.toString());
		return (await response.json()) as PaginatedResponse<ProducoesData>;
	},
	
};
