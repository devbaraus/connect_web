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


	$: formacaoQuery = createQuery({
		queryKey: ['pesquisador-formacao', $page.params.siape],
		queryFn: async ({ signal }) => PesquisadoresService.formacoes($page.params.siape, { signal })
	});

	$: formacaoGraphQuery = createQuery({
		queryKey: ['pesquisador-formacao-graph', $page.params.siape],
		queryFn: async ({ signal }) => PesquisadoresService.formacoesGraph($page.params.siape, { signal })
	});

	$: producoesChartQuery = createQuery({
		queryKey: ['pesquisador-producoes-chart'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesChart($page.params.siape, { signal })
	});

	$: producoesGraphQuery = createQuery({
		queryKey: ['pesquisador-producoes-graph', $page.params.siape],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesGraph($page.params.siape, { signal })
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
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<PesquisadorCard title="Formacação Acadêmica" query={formacaoQuery} class="lg:col-span-2">
			<ul class="divide-y divide-x-foreground space-y-2">
				{#if $formacaoQuery.data}
					{#each $formacaoQuery.data as formacao (formacao.curso.nome)}
						<li class="space-y-1 pt-2">
							<p class="text-lg capitalize">
								{formacao.tipo.replace('_', ' ')}<span class="inline-bloc mx-1">-</span>{formacao
									.curso.nome}
							</p>
							<time class="block text-sm"
								>Início: {formacao.ano_inicio}<span class="mx-1 text-neutral-300">|</span>Conclusão: {formacao.ano_conclusao}</time
							>
							<p>
								{formacao.instituicao.nome}
							</p>
						</li>
					{/each}
				{/if}
			</ul>
		</PesquisadorCard>

		
		<PesquisadorCard
			title="Conexões por Formação Acadêmica"
			query={formacaoGraphQuery}
			contentClass="h-[420px]"
		>
			{#if $formacaoGraphQuery.data}
				<ProducoesGraph data={$formacaoGraphQuery.data} />
			{/if}
		</PesquisadorCard>
	</div>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<PesquisadorCard
			title="Produção Bibliográfica"
			query={producoesChartQuery}
			class="lg:col-span-2"
			contentClass="h-[420px]"
		>
			{#if $producoesChartQuery.data}
				<ProducaoBibliograficaChart data={$producoesChartQuery.data} />
			{/if}
		</PesquisadorCard>

		<PesquisadorCard
			title="Colaborações em Produção Bibliográfica"
			query={producoesGraphQuery}
			contentClass="h-[420px]"
		>
			{#if $producoesGraphQuery.data}
				<ProducoesGraph data={$producoesGraphQuery.data} />
			{/if}
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
