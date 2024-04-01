import { ProducoesService } from '$lib/services/producoes-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams } }) => {
	const campus = searchParams.get('campus');
	// const grandeArea = params.grandeArea as string;
	// const area = params.area as string;

	return {
		chart: await ProducoesService.chart({
			campus
		})
	};
};
