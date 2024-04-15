import { PUBLIC_WEB_URL } from '$env/static/public';


export const ApiService = {
    busca: async (query: string, config?: RequestInit) => {
        const url = new URL(`${PUBLIC_WEB_URL}/v1/search`);
        url.searchParams.set('query', query);

        const response = await fetch(url.toString(), {
            signal: config?.signal
        });
        return (await response.json()) 
    }
}