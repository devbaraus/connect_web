
export const ApiService = {
    busca: async (query: string) => {
        const selfLocation = new URL(window.location.href);
        const url = new URL(`${selfLocation.origin}/v1/busca`);
        url.searchParams.set('query', query);
        const response = await fetch(url.toString());
        return (await response.json()) 
    }
}