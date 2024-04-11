<script lang="ts">
	import { page } from '$app/stores';
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import ProducoesFilters from '$lib/components/filters/ProducaoBibliograficaFilters.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let kind = $page.url.searchParams.get('kind') || 'tipo';
	let displayBy = $page.url.searchParams.get('display_by') || 'data';
	let anoGte = '2000';
	let anoLte = new Date().getFullYear().toString();

	$: {
		kind = $page.url.searchParams.get('kind') || 'tipo';
		displayBy = $page.url.searchParams.get('display_by') || 'data';
		anoGte = $page.url.searchParams.get('ano_gte') ?? anoGte;
		anoLte = $page.url.searchParams.get('ano_lte') ?? anoLte;
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
	<ProducoesFilters campuses={data.campus} grandesAreas={data.grandesAreas} areas={data.areas} />
</div>

<div class="h-[420px]">
	{#await data.chart}
		<div class="flex h-full w-full items-center justify-center"/>
	{:then chart}
		<ProducaoBibliograficaChart data={chart} {kind} {displayBy} />
		<!-- <hr />
	<Collapsible.Root>
		<Collapsible.Trigger>Listar produções bibliográficas</Collapsible.Trigger>
		<Collapsible.Content>
			<ProducaoBibliograficaList />
		</Collapsible.Content>
	</Collapsible.Root> -->
	{/await}
</div>
