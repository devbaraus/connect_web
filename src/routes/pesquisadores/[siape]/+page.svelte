<script lang="ts">
	import { page } from '$app/stores';
	import BancaSection from '$lib/components/pesquisadores/sections/BancaSection.svelte';
	import FormacaoSection from '$lib/components/pesquisadores/sections/FormacaoSection.svelte';
	import OrientacaoSection from '$lib/components/pesquisadores/sections/OrientacaoSection.svelte';
	import ProducaoBibliograficaSection from '$lib/components/pesquisadores/sections/ProducaoBibliograficaSection.svelte';
	import ProducaoTecnicaSection from '$lib/components/pesquisadores/sections/ProducaoTecnicaSection.svelte';
	import ProjetoPesquisaSection from '$lib/components/pesquisadores/sections/ProjetoPesquisaSection.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Tabs from '$lib/components/ui/tabs';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { createQuery } from '@tanstack/svelte-query';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let value = '';

	$: pesquisadorQuery = createQuery({
		queryKey: ['pesquisador'],
		queryFn: async ({ signal }) => PesquisadoresService.get($page.params.siape!, { signal })
	});

	$: metricsQuery = createQuery({
		queryKey: ['pesquisador', 'metrics'],
		queryFn: async ({ signal }) => PesquisadoresService.metrics($page.params.siape!, { signal })
	});

	let metrics = writable({});
	let showTabs = writable(false);

	$: {
		$metrics = $metricsQuery.data
			? Object.fromEntries(
					Object.entries($metricsQuery.data).map(([key, value]) => {
						return [
							key,
							Object.values(value).reduce((acc, curr) => {
								if (curr) {
									return acc + curr;
								}
								return acc;
							}, 0)
						];
					})
				)
			: {};

		$metrics.producao_bibliografica > 0 ||
		$metrics.producao_tecnica > 0 ||
		$metrics.banca > 0 ||
		$metrics.projeto_pesquisa > 0 ||
		$metrics.orientacao > 0
			? showTabs.set(true)
			: showTabs.set(false);
	}

	setContext('metrics', metrics);

	function onValueChange(v?: string) {
		value = String(v);
	}
</script>

<div
	class="absolute left-1/2 top-20 mx-auto h-16 w-full -translate-x-1/2 bg-foreground text-background"
>
	{#if $pesquisadorQuery.isFetching}
		<Skeleton class="mx-auto h-8 w-64" />
	{:else if $pesquisadorQuery.data}
		<p class="py-4 text-center text-2xl font-semibold">
			{$pesquisadorQuery.data.nome}
		</p>
	{/if}
</div>
<div class="space-y-8 pt-16">
	<FormacaoSection />
	{#if showTabs}
	<Tabs.Root {value} {onValueChange}>
		<Tabs.List class="h-full flex-wrap justify-start">
			{#if $metrics.producao_bibliografica}
				<Tabs.Trigger value="producao-bibliografica">Producao Bibliográfica</Tabs.Trigger>
			{/if}
			{#if $metrics.producao_tecnica}
				<Tabs.Trigger value="producao-tecnica">Produção Técnica</Tabs.Trigger>
			{/if}
			{#if $metrics.banca}
				<Tabs.Trigger value="banca">Banca</Tabs.Trigger>
			{/if}
			{#if $metrics.projeto_pesquisa}
				<Tabs.Trigger value="projeto-pesquisa">Projeto de Pesquisa</Tabs.Trigger>
			{/if}
			{#if $metrics.orientacao}
				<Tabs.Trigger value="orientacao">Orientação</Tabs.Trigger>
			{/if}
		</Tabs.List>
		{#if value === 'producao-bibliografica'}
			<Tabs.Content value="producao-bibliografica">
				<ProducaoBibliograficaSection />
			</Tabs.Content>
		{:else if value === 'producao-tecnica'}
			<Tabs.Content value="producao-tecnica">
				<ProducaoTecnicaSection />
			</Tabs.Content>
		{:else if value === 'banca'}
			<Tabs.Content value="banca">
				<BancaSection />
			</Tabs.Content>
		{:else if value === 'projeto-pesquisa'}
			<Tabs.Content value="projeto-pesquisa">
				<ProjetoPesquisaSection />
			</Tabs.Content>
		{:else if value === 'orientacao'}
			<Tabs.Content value="orientacao">
				<OrientacaoSection />
			</Tabs.Content>
		{/if}
	</Tabs.Root>
	{/if}
</div>
