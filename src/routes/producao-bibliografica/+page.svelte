<script lang="ts">
	import { page } from '$app/stores';
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import ProducoesFilters from '$lib/components/filters/ProducaoBibliograficaFilters.svelte';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { GeneralService } from '$lib/services/general-service';
	import { createQuery } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';
	import { ProducoesBibliograficasService } from '$lib/services/producoes-bibliograficas-service';
	import type { Area, Campus, GrandeArea } from '$lib/types';

	type Data = {
		campus: Promise<Campus[] | undefined>;
		grandesAreas: Promise<GrandeArea[] | undefined>;
		areas: Promise<Area[] | undefined>;
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
	let kind = $page.url.searchParams.get('kind') || 'tipo';
	let displayBy = $page.url.searchParams.get('display_by') || 'data';

	$: chartQuery = createQuery({
		queryKey: ['producoes-chart', { campus, grandeArea, area, kind, displayBy }],
		queryFn: async ({ signal }) =>
			ProducoesBibliograficasService.stats(
				{
					campus,
					grande_area: grandeArea,
					area,
					kind,
					displayBy
				},
				{ signal }
			)
	});

	$: {
		kind = $page.url.searchParams.get('kind') || 'tipo';
		displayBy = $page.url.searchParams.get('display_by') || 'data';
		campus = $page.url.searchParams.get('campus') || '';
		grandeArea = $page.url.searchParams.get('grande_area') || '';
		area = $page.url.searchParams.get('area') || '';
	}
</script>

<div class="space-y-4">
	<ProducoesFilters campuses={data.campus} grandesAreas={data.grandesAreas} areas={data.areas} />
</div>

<div class="mt-8 h-[420px] space-y-4">
	{#if $chartQuery.isFetching}
		<div class="flex h-full w-full items-center justify-center">
			<Loader />
		</div>
	{:else if $chartQuery.data}
		<ProducaoBibliograficaChart data={$chartQuery.data} {kind} {displayBy} />
	{/if}
</div>
