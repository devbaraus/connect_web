<script lang="ts">
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import BancaChart from '$lib/components/charts/BancaChart.svelte';
	import BancaGraph from '$lib/components/graphs/BancaGraph.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { page } from '$app/stores';
	import BancaList from '$lib/components/list/BancaList.svelte';

	$: bancasStatsQuery = createQuery({
		queryKey: ['pesquisador-bancas-stats'],
		queryFn: async ({ signal }) => PesquisadoresService.bancasStats($page.params.siape!, { signal })
	});

	$: bancasGraphQuery = createQuery({
		queryKey: ['pesquisador-bancas-graph'],
		queryFn: async ({ signal }) => PesquisadoresService.bancasGraph($page.params.siape!, { signal })
	});

	$: bancasQuery = createQuery({
		queryKey: ['pesquisador-bancas-list'],
		queryFn: async ({ signal }) => PesquisadoresService.bancas($page.params.siape!, { signal })
	});
</script>

<PesquisadorSection>
	<PesquisadorCard
		title="Bancas"
		query={bancasStatsQuery}
		class="lg:col-span-2"
		contentClass="h-[420px]"
	>
		{#if $bancasStatsQuery.data}
			<BancaChart data={$bancasStatsQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard title="Colaborações em Bancas" query={bancasGraphQuery} contentClass="h-[420px]">
		{#if $bancasGraphQuery.data}
			<BancaGraph data={$bancasGraphQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard title="Bancas" query={bancasQuery} class="col-span-full">
		{#if $bancasQuery.data}
			<BancaList data={$bancasQuery.data} />
		{/if}
	</PesquisadorCard>
</PesquisadorSection>
