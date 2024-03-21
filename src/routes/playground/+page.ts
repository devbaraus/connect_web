import type { PageLoad } from './$types';
import {PUBLIC_API_URL} from '$env/static/public'

type ChartData = {
	ano_producao: string;
	tipo_producao: string;
	count: number;
};

export const load: PageLoad = async () => {
	const response = await fetch(`${PUBLIC_API_URL}/article/producao_bibliografica/chart`);
	const chart =  await response.json() as ChartData[]

	return {
		chart,
	}
};
