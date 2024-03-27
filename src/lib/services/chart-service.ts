import { PUBLIC_API_URL } from '$env/static/public';

export type ChartData = {
	ano_producao: string;
	tipo_producao: string;
	count: number;
};

export async function fetchChart( fetch: any, filters: {
	campus?: string | null;
	grandeArea?: string | null;
	area?: string | null;
}) {
	const url = new URL(`${PUBLIC_API_URL}/producao_bibliografica/chart`);
	if (filters.campus) url.searchParams.append('campus', filters.campus);
	if (filters.grandeArea) url.searchParams.append('grande_area', filters.grandeArea);
	if (filters.area) url.searchParams.append('area', filters.area);

	const response = await fetch(url.toString());
	return (await response.json()) as ChartData[];
}
