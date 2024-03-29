import { fetchChart } from '$lib/services/chart-service';
import type { PageLoad } from './$types';
import { getPesquisador } from '$lib/services/pesquisadores-service';

export const load: PageLoad = async ({ params, fetch}) => {
	const siape = params.siape as string;

	return {
		chart: await fetchChart(fetch, {
			siape
		}),
		pesquisador: await getPesquisador(siape)
	};
};
