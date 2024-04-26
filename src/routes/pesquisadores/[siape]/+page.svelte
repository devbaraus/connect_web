<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import ProducaoBibliograficaSection from '$lib/components/pesquisadores/sections/ProducaoBibliograficaSection.svelte';
	import BancaSection from '$lib/components/pesquisadores/sections/BancaSection.svelte';
	import ProducaoTecnicaSection from '$lib/components/pesquisadores/sections/ProducaoTecnicaSection.svelte';
	import ProjetoPesquisaSection from '$lib/components/pesquisadores/sections/ProjetoPesquisaSection.svelte';

	$: pesquisadorQuery = createQuery({
		queryKey: ['pesquisador'],
		queryFn: async ({ signal }) => PesquisadoresService.get($page.params.siape!, { signal })
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
	<ProducaoBibliograficaSection />
	<ProducaoTecnicaSection />
	<ProjetoPesquisaSection />
	<BancaSection />
</div>
