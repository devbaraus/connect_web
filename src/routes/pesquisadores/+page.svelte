<script lang="ts">
	import { page } from '$app/stores';
	import PesquisadoresChart from '$lib/components/charts/FormacaoAcademicaChart.svelte';
	import PesquisadoresFilters from '$lib/components/filters/PesquisadoresFilters.svelte';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { FormacoesService } from '$lib/services/formacoes-service';
	import { GeneralService } from '$lib/services/general-service';
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';

	type Data = {
		campus: Promise<string[] | undefined>;
		grandesAreas: Promise<string[] | undefined>;
		areas: Promise<string[] | undefined>;
	};

	let data: Data = {
		campus: Promise.resolve([]),
		grandesAreas: Promise.resolve([]),
		areas: Promise.resolve([])
	};

	onMount(async () => {
		data = {
			grandesAreas: GeneralService.grandeAreas(),
			areas: GeneralService.area(),
			campus: GeneralService.campus()
		};
	});

	let campus = $page.url.searchParams.get('campus') || '';
	let grandeArea = $page.url.searchParams.get('grande_area') || '';
	let area = $page.url.searchParams.get('area') || '';
	let kind = $page.url.searchParams.get('exibir_por') || 'data';

	$: chartQuery = createQuery({
		queryKey: ['pesquisadores-chart'],
		queryFn: async ({ signal }) =>
			FormacoesService.stats(
				{
					campus,
					area,
					exibir_por: kind
				},
				{ signal }
			)
	});

	$: {
		kind = $page.url.searchParams.get('exibir_por') || 'data';
		campus = $page.url.searchParams.get('campus') || '';
		grandeArea = $page.url.searchParams.get('grande_area') || '';
		area = $page.url.searchParams.get('area') || '';
	}
	
</script>

<div class="space-y-4">
	<PesquisadoresFilters
		campuses={data.campus}
		grandesAreas={data.grandesAreas}
		areas={data.areas}
	/>
</div>

<div class="mt-8 h-[420px] space-y-4">
	{#if $chartQuery.isFetching}
		<div class="flex h-full w-full items-center justify-center">
			<Loader />
		</div>
	{:else if $chartQuery.data}
		<PesquisadoresChart data={$chartQuery.data} {kind} />
	{/if}
</div>
