<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import ProducoesGraph from '$lib/components/graphs/ProducoesGraph.svelte';
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';

	$: pesquisadorQuery = createQuery({
		queryKey: ['pesquisador', $page.params.siape],
		queryFn: async ({ signal }) => PesquisadoresService.get($page.params.siape, { signal })
	});

	$: graphQuery = createQuery({
		queryKey: ['pesquisador-graph', $page.params.siape],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesGraph($page.params.siape, { signal })
	});

	$: formacaoQuery = createQuery({
		queryKey: ['pesquisador-formacao', $page.params.siape],
		queryFn: async ({ signal }) => PesquisadoresService.formacoes($page.params.siape, { signal })
	});

	$: chartQuery = createQuery({
		queryKey: ['producoes-chart'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesChart($page.params.siape, { signal })
	});
</script>

<div class="absolute left-1/2 mx-auto h-16 w-full -translate-x-1/2 bg-foreground text-background">
	{#if $pesquisadorQuery.isFetching}
		<Skeleton class="h-8 w-64" />
	{:else if $pesquisadorQuery.data}
		<p class="py-4 text-center text-2xl font-semibold">
			{$pesquisadorQuery.data.nome}
		</p>
	{/if}
</div>
<div class="space-y-8 pt-24">
	<PesquisadorCard title="Formacação Acadêmica" query={formacaoQuery}>
		<ul>
			{#each $formacaoQuery.data as formacao (formacao.curso.nome)}
				<li>
					<span class="font-bold">{formacao.tipo.replace('_', ' ')}</span>: ({formacao.ano_inicio}~{formacao.ano_conclusao})
					{formacao.curso.nome} - {formacao.instituicao.nome}
				</li>
			{/each}
		</ul>
	</PesquisadorCard>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<PesquisadorCard
			title="Produção Bibliográfica"
			query={chartQuery}
			class="lg:col-span-2"
			contentClass="h-[420px]"
		>
			<ProducaoBibliograficaChart data={$chartQuery.data} />
		</PesquisadorCard>

		<PesquisadorCard
			title="Colaborações em Produção Bibliográfica"
			query={graphQuery}
			contentClass="h-[420px]"
		>
			<ProducoesGraph data={$graphQuery.data} />
		</PesquisadorCard>
	</div>
</div>
<!--
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
