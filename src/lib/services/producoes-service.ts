import { PUBLIC_API_URL } from '$env/static/public';
import type { PaginatedResponse, ProducoesChartData, ProducoesData } from '$lib/types';

export const ProducoesService = {
	grandeAreas: async (
		filters: {
			campus?: string | null;
		} = {}
	) => {
		const url = new URL(`v1/producoes/grande_area`, PUBLIC_API_URL);
		if (filters?.campus) url.searchParams.append('campus', filters.campus);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
	area: async (
		filters: {
			campus?: string | null;
			grandeArea?: string | null;
		} = {}
	) => {
		const url = new URL(`v1/producoes/area`, PUBLIC_API_URL);
		if (filters?.campus) url.searchParams.append('campus', filters.campus);
		if (filters?.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
	campus: async () => {
		const url = new URL(`v1/producoes/campus`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
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
	chart: async (
		filters: {
			campus?: string | null;
			grandeArea?: string | null;
			area?: string | null;
			siape?: string | null;
			kind?: string | null;
			displayBy?: string | null;
		},
		config?: {
			signal?: AbortSignal;
		}
	) => {
		const url = new URL(`v1/producoes/stats`, PUBLIC_API_URL);
		if (filters.campus) url.searchParams.append('campus', filters.campus);
		if (filters.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		if (filters.area) url.searchParams.append('area', filters.area);
		if (filters.siape) url.searchParams.append('siape', filters.siape);
		url.searchParams.append('kind', filters.kind ?? 'tipo');
		url.searchParams.append('display_by', filters.displayBy ?? 'data');

		const response = await fetch(url.toString(), {
			signal: config?.signal
		});
		return (await response.json()) as ProducoesChartData[];
	}
};
