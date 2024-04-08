<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import ProducoesFilters from '$lib/components/filters/ProducaoBibliograficaFilters.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let timeout: NodeJS.Timeout;
	let anoGte = '2000';
	let anoLte = new Date().getFullYear().toString();

	$: {
		anoGte = $page.url.searchParams.get('ano_gte') ?? anoGte;
		anoLte = $page.url.searchParams.get('ano_lte') ?? anoLte;
	}

	$: chartYears = Array.from(new Set(data.chart?.map((d) => d.ano)));

	$: chartRange = [
		100 - (chartYears.filter((year) => +year >= +anoGte).length / chartYears.length) * 100,
		(chartYears.filter((year) => +year <= +anoLte).length / chartYears.length) * 100
	] as [number, number];

	function onDataZoom(params: { batch: {start: number, end:number}[] } | {start: number, end: number}) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			const start = 'batch' in params ? params.batch[0].start : params.start;
			const end = 'batch' in params ? params.batch[0].end : params.end;

			const startYear =
				chartYears[Math.round((start / 100) * chartYears.length)] ?? chartYears.at(0);
			const endYear =
				chartYears[Math.round((end / 100) * chartYears.length)] ?? chartYears.at(-1);

			const url = new URL(location.href);
			url.searchParams.set('ano_gte', startYear);
			url.searchParams.set('ano_lte', endYear);
			goto(url.toString());
		}, 500);
	}
</script>

<div class="space-y-4">
	<ProducoesFilters campuses={data.campus} grandesAreas={data.grandesAreas} areas={data.areas} />
</div>
<ProducaoBibliograficaChart
	data={data.chart}

/>
<hr />
<!-- {#await data.producoes}
	<p>Carregando...</p>
{:then producoes}
	<ul>
		{#each producoes.results as producao (producao.id)}
			<li>{producao.titulo}</li>
		{/each}
	</ul>
{:catch}
	<p>Erro ao carregar</p>
{/await} -->
