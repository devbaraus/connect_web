<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ProducaoBibliograficaChart from '$lib/components/charts/producao-bibliografica-chart.svelte';
	import * as Select from '$lib/components/ui/select';
	import type { Selected } from 'bits-ui';
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

	function gotoOption(option: Selected<string>, paramName: string) {
		const url = new URL(location.href);
		url.searchParams.set(paramName, option.value);
		goto(url.toString());
	}
</script>

<div class="space-y-4">
	<Select.Root onSelectedChange={(v) => gotoOption(v, 'campus')}>
		<Select.Trigger>
			<Select.Value placeholder="Câmpus" />
		</Select.Trigger>
		<Select.Content>
			{#await data.campus}
				<Select.Item value="">Carregando...</Select.Item>
			{:then campuses}
				<Select.Item value="">TODOS</Select.Item>

				{#each campuses as campus}
					<Select.Item value={campus}>{campus.toUpperCase()}</Select.Item>
				{/each}
			{:catch error}
				<Select.Item value="">Erro ao carregar</Select.Item>
			{/await}
		</Select.Content>
	</Select.Root>
	<Select.Root onSelectedChange={(v) => gotoOption(v, 'grande_area')}>
		<Select.Trigger>
			<Select.Value placeholder="Grande Área do Conhecimento" />
		</Select.Trigger>
		<Select.Content>
			{#await data.grandesAreas}
				<Select.Item value="">Carregando...</Select.Item>
			{:then grandesAreas}
				<Select.Item value="">TODAS</Select.Item>

				{#each grandesAreas as grandeArea}
					<Select.Item value={grandeArea} class="capitalize"
						>{grandeArea.replaceAll('_', ' ').toUpperCase()}</Select.Item
					>
				{/each}
			{:catch}
				<Select.Item value="">Erro ao carregar</Select.Item>
			{/await}
		</Select.Content>
	</Select.Root>
	<Select.Root onSelectedChange={(v) => gotoOption(v, 'area')}>
		<Select.Trigger>
			<Select.Value placeholder="Área do Conhecimento" />
		</Select.Trigger>
		<Select.Content>
			{#await data.areas}
				<Select.Item value="">Carregando...</Select.Item>
			{:then areas}
				<Select.Item value="">TODAS</Select.Item>

				{#each areas as area}
					<Select.Item value={area} class="capitalize">{area}</Select.Item>
				{/each}
			{:catch}
				<Select.Item value="">Erro ao carregar</Select.Item>
			{/await}
		</Select.Content>
	</Select.Root>
</div>
<ProducaoBibliograficaChart
	data={data.chart}
	defaultYears={chartYears}
	defaultRange={chartRange}
	events={{
		datazoom: onDataZoom
	}}
/>

<hr />
{#await data.producoes}
	<p>Carregando...</p>
{:then producoes}
	<ul>
		{#each producoes.results as producao (producao.id)}
			<li>{producao.titulo}</li>
		{/each}
	</ul>
{:catch}
	<p>Erro ao carregar</p>
{/await}
