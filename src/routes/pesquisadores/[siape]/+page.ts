import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if(!params.siape) error(400, 'Missing siape parameter');
};