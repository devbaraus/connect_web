import { PUBLIC_API_URL } from '$env/static/public';

export async function fetchCampus(fetch:any) {
	const url = new URL(`${PUBLIC_API_URL}/campus`);
	const response = await fetch(url.toString());
	return (await response.json()) as string[];
}