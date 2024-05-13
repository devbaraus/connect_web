<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { searchHits } from '$lib/stores/search';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	let className: string | undefined = undefined;

	$: searchQuery = $page.url.searchParams.get('q') || undefined;

	$: query = createQuery({
		queryKey: ['search_pesquisadores', searchQuery],
		queryFn: async ({ signal }) => {
			try {
				return await PesquisadoresService.list(
					{
						query: searchQuery,
						page: 1,
						page_size: 10
					},
					{ signal }
				);
			} catch (e) {
				console.error(e);
				return {
					hits: [],
					query: searchQuery,
					processingTimeMs: 0,
					limit: 0,
					offset: 0,
					estimatedTotalHits: 0
				};
			}
		},
		enabled: true
	});

	$: $searchHits = $query.data?.hits ?? [];

	export { className as class };
</script>

<form action="/busca" class={cn(className)}>
	<Input
		value={searchQuery}
		autocomplete="off"
		name="q"
		placeholder="Pesquise por nome do pesquisador, citação bibliográfica, produção bibliográfica, formação acadêmica ou palavra chave"
		type="text"
		class="w-full"
	/>
</form>
