import { PUBLIC_API_URL } from '$env/static/public';

export const GeneralService = {
	campus: async () => {
		const url = new URL(`v1/campus`, PUBLIC_API_URL);
		const response = await fetch(url.toString());
		return (await response.json()) as string[];
	}
}
