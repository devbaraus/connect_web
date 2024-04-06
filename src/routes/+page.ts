import { ProducoesService } from '$lib/services/producoes-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams } }) => {
	const campus = searchParams.get('campus');
	const grandeArea = searchParams.get('grande_area');
	const area = searchParams.get('area');

	return {
		grandesAreas: await ProducoesService.grandeAreas({
			campus
		}),
		areas: await ProducoesService.area({
			campus,
			grandeArea
		}),
		campus: await ProducoesService.campus(),
		chart: await ProducoesService.chart({
			campus,
			grandeArea,
			area
		})
	};
};
