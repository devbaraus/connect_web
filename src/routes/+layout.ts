import type { LayoutLoad } from './$types';
import { GeneralService } from '$lib/services/general-service';

export const load: LayoutLoad = async () => {
	return {
		campus: await GeneralService.campus()
	};
};