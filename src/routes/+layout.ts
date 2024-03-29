import { listCampus } from '$lib/services/campus-service';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	return {
		campus: await listCampus(fetch)
	};
};
