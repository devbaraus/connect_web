import { ProducoesService } from '$lib/services/producoes-service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams } }) => {
	const campus = searchParams.get('campus');
	const grandeArea = searchParams.get('grande_area');
	const area = searchParams.get('area');
	const kind = searchParams.get('kind');
	const display_by = searchParams.get('display_by')
	// const anoLte = searchParams.get('ano_lte') ?? new Date().getFullYear().toString();
	// const anoGte = searchParams.get('ano_gte') ?? '2000'

	return {
		grandesAreas: ProducoesService.grandeAreas({
			campus
		}),
		areas: ProducoesService.area({
			campus,
			grandeArea
		}),
		campus: ProducoesService.campus(),
		// producoes: ProducoesService.list({
		// 	campus,
		// 	grandeArea,
		// 	area,
		// 	anoLte: anoLte ? parseInt(anoLte) : undefined,
		// 	anoGte: anoGte ? parseInt(anoGte) : undefined,
		// 	page: 1,
		// 	perPage: 10
		// }),
		chart: ProducoesService.chart({
			campus,
			grandeArea,
			area, 
			kind,
			display_by
		})
	};
};
