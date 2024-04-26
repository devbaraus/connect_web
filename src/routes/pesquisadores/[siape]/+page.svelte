<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import ProducaoBibliograficaSection from '$lib/components/pesquisadores/sections/ProducaoBibliograficaSection.svelte';
	import BancaSection from '$lib/components/pesquisadores/sections/BancaSection.svelte';
	import ProducaoTecnicaSection from '$lib/components/pesquisadores/sections/ProducaoTecnicaSection.svelte';
	import ProjetoPesquisaSection from '$lib/components/pesquisadores/sections/ProjetoPesquisaSection.svelte';
	import FormacaoSection from '$lib/components/pesquisadores/sections/FormacaoSection.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	let value = 'producao-bibliografica';

	$: pesquisadorQuery = createQuery({
		queryKey: ['pesquisador'],
		queryFn: async ({ signal }) => PesquisadoresService.get($page.params.siape!, { signal })
	});

	function onValueChange(v?: string) {
		value = String(v);
	}
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
	<FormacaoSection />
	<Tabs.Root {value} {onValueChange}>
		<Tabs.List>
			<Tabs.Trigger value="producao-bibliografica">Producao Bibliográfica</Tabs.Trigger>
			<Tabs.Trigger value="producao-tecnica">Produção Técnica</Tabs.Trigger>
			<Tabs.Trigger value="banca">Banca</Tabs.Trigger>
			<Tabs.Trigger value="projeto-pesquisa">Projeto de Pesquisa</Tabs.Trigger>
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
		{/if}
	</Tabs.Root>
</div>
