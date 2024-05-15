<script lang="ts">
	import { page } from '$app/stores';
	import BancaChart from '$lib/components/charts/BancaChart.svelte';
	import OrientacaoChart from '$lib/components/charts/OrientacaoChart.svelte';
	import BancaGraph from '$lib/components/graphs/BancaGraph.svelte';
	import OrientacaoGraph from '$lib/components/graphs/OrientacaoGraph.svelte';
	import OrientacaoList from '$lib/components/list/OrientacaoList.svelte';
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { createQuery } from '@tanstack/svelte-query';

	$: orientacoesStatsQuery = createQuery({
		queryKey: ['pesquisador-orientacoes-stats'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.orientacoesStats($page.params.siape!, { signal })
	});

	$: orientacoesGraphQuery = createQuery({
		queryKey: ['pesquisador-orientacoes-graph'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.orientacoesGraph($page.params.siape!, { signal })
	});

	$: orientacoesQuery = createQuery({
		queryKey: ['pesquisador-orientacoes-list'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.orientacoesList($page.params.siape!, { signal })
	});
</script>

<PesquisadorSection>
	<PesquisadorCard
		title="Orientações"
		query={orientacoesStatsQuery}
		class="lg:col-span-2"
		contentClass="h-[420px]"
	>
		{#if $orientacoesStatsQuery.data}
			<OrientacaoChart data={$orientacoesStatsQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard
		title="Colaborações em Orientações"
		query={orientacoesGraphQuery}
		contentClass="h-[420px]"
	>
		{#if $orientacoesGraphQuery.data}
			<OrientacaoGraph data={$orientacoesGraphQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard title="Orientações" query={orientacoesQuery} class="col-span-full">
		{#if $orientacoesQuery.data}
			<OrientacaoList data={$orientacoesQuery.data} />
		{/if}
	</PesquisadorCard>
</PesquisadorSection>
