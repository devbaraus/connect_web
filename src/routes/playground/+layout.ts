import type { LayoutLoad } from './$types';
import { fetchCampus } from '$lib/services/campus-service';

export const load: LayoutLoad = async ({ fetch }) => {
	return {
		campus: await fetchCampus(fetch)
	};
};
