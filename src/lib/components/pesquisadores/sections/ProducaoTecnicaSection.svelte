<script lang="ts">
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import ProducaoTecnicaChart from '$lib/components/charts/ProducaoTecnicaChart.svelte';
	import ProducaoTecnicaGraph from '$lib/components/graphs/ProducaoTecnicaGraph.svelte';
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { page } from '$app/stores';
	import ProducaoTecnicaList from '$lib/components/list/ProducaoTecnicaList.svelte';

	$: producoesTecnicasChartQuery = createQuery({
		queryKey: ['pesquisador-producoes-tecnicas-chart'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesTecnicasStats($page.params.siape!, { signal })
	});

	$: producoesTecnicasQuery = createQuery({
		queryKey: ['pesquisador-producoes-tecnicas'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesTecnicas($page.params.siape!, { signal })
	});

	$: producoesTecnicasGraphQuery = createQuery({
		queryKey: ['pesquisador-producoes-tecnicas-graph'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesTecnicasGraph($page.params.siape!, { signal })
	});
</script>

<PesquisadorSection>
	<PesquisadorCard
		title="Produção Técnica"
		query={producoesTecnicasChartQuery}
		class="lg:col-span-2"
		contentClass="h-[420px]"
	>
		{#if $producoesTecnicasChartQuery.data}
			<ProducaoTecnicaChart data={$producoesTecnicasChartQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard
		title="Colaborações em Produção Técnica"
		query={producoesTecnicasGraphQuery}
		contentClass="h-[420px]"
	>
		{#if $producoesTecnicasGraphQuery.data}
			<ProducaoTecnicaGraph data={$producoesTecnicasGraphQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard title="Produções Técnicas" query={producoesTecnicasQuery} class="col-span-full">
		{#if $producoesTecnicasQuery.data}
			<ProducaoTecnicaList data={$producoesTecnicasQuery.data} />
		{/if}
	</PesquisadorCard>
</PesquisadorSection>
