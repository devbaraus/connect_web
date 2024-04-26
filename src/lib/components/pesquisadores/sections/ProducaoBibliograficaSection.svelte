<script lang="ts">
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import ProducaoBibliograficaGraph from '$lib/components/graphs/ProducaoBibliograficaGraph.svelte';
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { page } from '$app/stores';

	$: producoesChartQuery = createQuery({
		queryKey: ['pesquisador-producoes-chart'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesBibliograficasStats($page.params.siape!, { signal })
	});

	$: producoesGraphQuery = createQuery({
		queryKey: ['pesquisador-producoes-graph'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.producoesBibliograficasGraph($page.params.siape!, { signal })
	});
</script>

<PesquisadorSection>
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
			<ProducaoBibliograficaGraph data={$producoesGraphQuery.data} />
		{/if}
	</PesquisadorCard>
</PesquisadorSection>
