import { fetchChart } from '$lib/services/chart-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url: { searchParams } }) => {
	const campus = searchParams.get('campus');
	// const grandeArea = params.grandeArea as string;
	// const area = params.area as string;

	return {
		chart: await fetchChart(fetch, {
			campus
		})
	};
};
