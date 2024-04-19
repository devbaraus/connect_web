<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import ProducoesGraph from '$lib/components/graphs/ProducoesGraph.svelte';

	$: pesquisadorQuery = createQuery({
		queryKey: ['pesquisador', $page.params.siape],
		queryFn: async ({ signal }) => PesquisadoresService.get($page.params.siape, { signal })
	});

	$: graphQuery = createQuery({
		queryKey: ['pesquisador-graph', $page.params.siape],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesGraph($page.params.siape, { signal })
	});

	$: chartQuery = createQuery({
		queryKey: ['producoes-chart'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesChart($page.params.siape, { signal })
	});
</script>

{#if $pesquisadorQuery.isFetching}
	<Skeleton class="h-8 w-64" />
{:else if $pesquisadorQuery.data}
	<p class="text-center text-2xl font-semibold">
		{$pesquisadorQuery.data.nome}
	</p>
{/if}

<div class="h-[420px] mt-8 space-y-4">
	<p class="text-xl font-semibold">
		Produção Bibliográfica
	</p>
	{#if $chartQuery.isFetching}
		<div class="flex h-full w-full items-center justify-center">
			<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
		</div>
	{:else if $chartQuery.data}
		<ProducaoBibliograficaChart data={$chartQuery.data} />
	{/if}
</div>

<div class="h-[650px] mt-8 space-y-4">
	<p class="text-xl font-semibold">
		Colaborações em Produção Bibliográfica
	</p>
	{#if $graphQuery.isFetching}
		<div class="flex h-full w-full items-center justify-center">
			<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
		</div>
	{:else if $graphQuery.data}
		<ProducoesGraph data={$graphQuery.data} />
	{/if}
</div>

<!-- <p>Formação Acadêmica</p>
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
{/await} -->
