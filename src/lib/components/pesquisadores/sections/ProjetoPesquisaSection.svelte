<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { page } from '$app/stores';
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import ProjetoPesquisaGraph from '$lib/components/graphs/ProjetoPesquisaGraph.svelte';
	import ProjetoPesquisaChart from '$lib/components/charts/ProjetoPesquisaChart.svelte';
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import ProjetoPesquisaList from '$lib/components/list/ProjetoPesquisaList.svelte';

	$: projetosPesquisaQuery = createQuery({
		queryKey: ['pesquisador-projetos-pesquisa-list'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.projetosPesquisa($page.params.siape!, { signal })
	});

	$: projetosPesquisaStatsQuery = createQuery({
		queryKey: ['pesquisador-projetos-pesquisa-stats'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.projetosPesquisaStats($page.params.siape!, { signal })
	});

	$: projetosPesquisaGraphQuery = createQuery({
		queryKey: ['pesquisador-projetos-pesquisa-graph'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.projetosPesquisaGraph($page.params.siape!, { signal })
	});
</script>

<PesquisadorSection>
	<PesquisadorCard
		title="Projetos de Pesquisa"
		query={projetosPesquisaStatsQuery}
		class="lg:col-span-2"
		contentClass="h-[420px]"
	>
		{#if $projetosPesquisaStatsQuery.data}
			<ProjetoPesquisaChart data={$projetosPesquisaStatsQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard
		title="Colaborações em Projetos de Pesquisa"
		query={projetosPesquisaGraphQuery}
		contentClass="h-[420px]"
	>
		{#if $projetosPesquisaGraphQuery.data}
			<ProjetoPesquisaGraph data={$projetosPesquisaGraphQuery.data} />
		{/if}
	</PesquisadorCard>

	<PesquisadorCard title="Produções Técnicas" query={projetosPesquisaQuery} class="col-span-full">
		{#if $projetosPesquisaQuery.data}
			<ProjetoPesquisaList data={$projetosPesquisaQuery.data} />
		{/if}
	</PesquisadorCard>
</PesquisadorSection>
