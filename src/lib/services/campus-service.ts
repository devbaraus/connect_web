import { PUBLIC_API_URL } from '$env/static/public';

export async function listCampus(fetch:any) {
	const url = new URL(`v1/campus`, PUBLIC_API_URL);
	const response = await fetch(url.toString());
	return (await response.json()) as string[];
}