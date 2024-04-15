<script lang="ts">
	import { chart } from '$lib/actions/chart';
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	$: palavrasChave = Object.fromEntries(Object.entries(data.palavrasChave.reduce((acc, item) => {
		if (!acc[item]) {
			acc[item] = 0;
		}
		acc[item] += 1;

		return acc;
	}, {})).sort((a, b) => a[1] - b[1]))
</script>

{#await data.pesquisador}
	<Skeleton class="h-8 w-64" />
{:then pesquisador}
	<p class="text-center text-2xl font-semibold">
		{pesquisador.nome}
	</p>
{/await}

<ProducaoBibliograficaChart data={data.producoes} />

<p>Formação Acadêmica</p>
{#await data.formacoes}
	<Skeleton class="h-8 w-64" />
{:then formacoes}
	<ul>
		{#each formacoes as formacao (formacao.id)}
			<li>
				<span class="font-bold">{formacao.tipo.replace('_', ' ')}</span>: ({formacao.ano_inicio}~{formacao.ano_conclusao})
				{formacao.curso.nome} - {formacao.instituicao.nome}
			</li>
		{/each}
	</ul>
{/await}

<hr />

{#await data.areasConhecimento}
	<Skeleton class="h-8 w-64" />
{:then areasConhecimento}
	<p>Grandes áreas</p>
	<ul>
		{#each areasConhecimento.grandes_areas as item (item)}
			<li>
				<span class="font-bold capitalize">{item.replaceAll('_', ' ').toLowerCase()}</span>
			</li>
		{/each}
	</ul>

	<hr />
	<p>Áreas</p>
	<ul>
		{#each areasConhecimento.areas as item (item)}
			<li>
				<span class="font-bold">{item}</span>
			</li>
		{/each}
	</ul>

	<hr />
	<p>Subáreas</p>
	<ul>
		{#each areasConhecimento.subareas as item (item)}
			<li>
				<span class="font-bold">{item}</span>
			</li>
		{/each}
	</ul>

	<hr />
	<p>Especialidades</p>
	<ul>
		{#each areasConhecimento.especialidades as item (item)}
			<li>
				<span class="font-bold">{item}</span>
			</li>
		{/each}
	</ul>
{/await}

<div
	class="h-96 w-full"
	use:chart={{
		options: {
			title: {
				text: 'World Population'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				type: 'category',
				data: Object.keys(palavrasChave)
			},
			series: [
				{
					type: 'bar',
					data: Object.values(palavrasChave)
				}
			]
		}
	}}
></div>
