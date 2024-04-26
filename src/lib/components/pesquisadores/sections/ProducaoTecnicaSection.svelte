<script lang="ts">
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import ProducaoTecnicaChart from '$lib/components/charts/ProducaoTecnicaChart.svelte';
	import ProducaoTecnicaGraph from '$lib/components/graphs/ProducaoTecnicaGraph.svelte';
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { page } from '$app/stores';

	$: producoesTecnicasChartQuery = createQuery({
		queryKey: ['pesquisador-producoes-tecnicas-chart'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesTecnicasStats($page.params.siape!, { signal })
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
</PesquisadorSection>
