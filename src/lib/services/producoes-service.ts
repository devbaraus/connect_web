import { PUBLIC_API_URL } from '$env/static/public';
import type { ProducoesChartData } from '$lib/types';

export const ProducoesService = {
	grandeAreas: async (filters?: {
		campus?: string | null;
	}) => {
		const url = new URL(`v1/producoes/grande_area`, PUBLIC_API_URL);
		if (filters?.campus) url.searchParams.append('campus', filters.campus);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
	area: async (filters?: {
		campus?: string | null;
		grandeArea?: string | null;
	}) => {
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
	chart: async (
		filters: {
			campus?: string | null;
			grandeArea?: string | null;
			area?: string | null;
			siape?: string | null;
		}
	) => {
		const url = new URL(`v1/producoes/chart`, PUBLIC_API_URL);
		if (filters.campus) url.searchParams.append('campus', filters.campus);
		if (filters.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		if (filters.area) url.searchParams.append('area', filters.area);
		if (filters.siape) url.searchParams.append('siape', filters.siape);

		const response = await fetch(url.toString());
		return (await response.json()) as ProducoesChartData[];
	}
};
