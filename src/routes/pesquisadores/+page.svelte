<script lang="ts">
	import { page } from '$app/stores';
	import PesquisadoresChart from '$lib/components/charts/PesquisadoresChart.svelte';
	import PesquisadoresFilters from '$lib/components/filters/PesquisadoresFilters.svelte';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { createQuery } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { ProducoesService } from '$lib/services/producoes-service';
	import { GeneralService } from '$lib/services/general-service';
	import Loader from '$lib/components/ui/Loader.svelte';

	type Data = {
		campus: Promise<string[]>;
		grandesAreas: Promise<string[]>;
		areas: Promise<string[]>;
	}

	let data: Data = {
		campus: Promise.resolve([]),
		grandesAreas: Promise.resolve([]),
		areas: Promise.resolve([])
	}

	onMount(async () => {
		data = {
			grandesAreas: GeneralService.grandeAreas(),
			areas: GeneralService.area(),
			campus: GeneralService.campus()
		};
	});


	// let anoGte = '2000';
	// let anoLte = new Date().getFullYear().toString();
	let campus = $page.url.searchParams.get('campus') || '';
	let grandeArea = $page.url.searchParams.get('grande_area') || '';
	let area = $page.url.searchParams.get('area') || '';
	let kind = $page.url.searchParams.get('exibir_por') || 'data';

	$: chartQuery = createQuery({
		queryKey: ['pesquisadores-chart'],
		queryFn: async ({ signal }) =>
		GeneralService.formacaoesChart(
				{
					campus,
					grandeArea,
					area,
					exibirPor: kind,
				},
				{ signal }
			)
	});

	$: {
		kind = $page.url.searchParams.get('exibir_por') || 'data';
		campus = $page.url.searchParams.get('campus') || '';
		grandeArea = $page.url.searchParams.get('grande_area') || '';
		area = $page.url.searchParams.get('area') || '';
		// anoGte = $page.url.searchParams.get('ano_gte') ?? anoGte;
		// anoLte = $page.url.searchParams.get('ano_lte') ?? anoLte;
	}

	// $: chartYears = Array.from(new Set(data.chart?.map((d) => d.ano)));

	// $: chartRange = [
	// 	100 - (chartYears.filter((year) => +year >= +anoGte).length / chartYears.length) * 100,
	// 	(chartYears.filter((year) => +year <= +anoLte).length / chartYears.length) * 100
	// ] as [number, number];

	// function onDataZoom(
	// 	params: { batch: { start: number; end: number }[] } | { start: number; end: number }
	// ) {
	// 	clearTimeout(timeout);

	// 	timeout = setTimeout(() => {
	// 		const start = 'batch' in params ? params.batch[0].start : params.start;
	// 		const end = 'batch' in params ? params.batch[0].end : params.end;

	// 		const startYear =
	// 			chartYears[Math.round((start / 100) * chartYears.length)] ?? chartYears.at(0);
	// 		const endYear = chartYears[Math.round((end / 100) * chartYears.length)] ?? chartYears.at(-1);

	// 		const url = new URL(location.href);
	// 		url.searchParams.set('ano_gte', startYear);
	// 		url.searchParams.set('ano_lte', endYear);
	// 		goto(url.toString());
	// 	}, 500);
	// }
</script>

<div class="space-y-4">
	<PesquisadoresFilters campuses={data.campus} grandesAreas={data.grandesAreas} areas={data.areas} />
</div>

<div class="h-[420px] mt-8 space-y-4">
	{#if $chartQuery.isFetching}
		<div class="flex h-full w-full items-center justify-center">
			<Loader/>
		</div>
	{:else if $chartQuery.data}
		<PesquisadoresChart data={$chartQuery.data} {kind} />
		<!-- <hr />
	<Collapsible.Root>
		<Collapsible.Trigger>Listar produções bibliográficas</Collapsible.Trigger>
		<Collapsible.Content>
			<ProducaoBibliograficaList />
		</Collapsible.Content>
	</Collapsible.Root> -->
	{/if}
</div>
