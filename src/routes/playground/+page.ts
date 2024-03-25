import type { PageLoad } from './$types';
import { fetchChart } from '$lib/services/chart-service';

export const load: PageLoad = async ({ params, fetch, url: { searchParams } }) => {
	const campus = searchParams.get('campus');
	// const grandeArea = params.grandeArea as string;
	// const area = params.area as string;

	return {
		chart: await fetchChart(fetch, {
			campus
		})
	};
};
