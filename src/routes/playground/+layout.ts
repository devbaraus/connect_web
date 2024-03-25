import type { PageLoad } from './$types';
import { fetchCampus } from '$lib/services/campus-service';

export const load: PageLoad = async ({fetch}) => {
	return {
		campus: await fetchCampus(fetch)
	};
};
