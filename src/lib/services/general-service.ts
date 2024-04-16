import { PUBLIC_API_URL } from '$env/static/public';
import type { ProducoesChartData } from '$lib/types';

export const GeneralService = {
	grandeAreas: async (
		filters: {
			campus?: string | null;
		} = {}
	) => {
		const url = new URL(`v1/grande_area`, PUBLIC_API_URL);
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
		const url = new URL(`v1/area`, PUBLIC_API_URL);
		if (filters?.campus) url.searchParams.append('campus', filters.campus);
		if (filters?.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
	campus: async () => {
		const url = new URL(`v1/campus`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	},
	formacaoesChart: async (
		filters: {
			campus?: string | null;
			grandeArea?: string | null;
			area?: string | null;
			exibirPor?: string | null;
		},
		config?: RequestInit
	) => {
		const url = new URL(`v1/formacoes/stats`, PUBLIC_API_URL);
		if (filters.campus) url.searchParams.append('campus', filters.campus);
		if (filters.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
		if (filters.area) url.searchParams.append('area', filters.area);
		url.searchParams.append('exibir_por', filters.exibirPor ?? 'data');

		const response = await fetch(url.toString(), config);

		return (await response.json()) as ProducoesChartData[];
	},
	producoesChart: async (
		filters: {
			campus?: string | null;
			grandeArea?: string | null;
			area?: string | null;
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
		url.searchParams.append('kind', filters.kind ?? 'tipo');
		url.searchParams.append('display_by', filters.displayBy ?? 'data');

		const response = await fetch(url.toString(), {
			signal: config?.signal
		});
		return (await response.json()) as ProducoesChartData[];
	}
}
