<script lang="ts">
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import FormacaoGraph from '$lib/components/graphs/FormacaoGraph.svelte';
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { page } from '$app/stores';

	$: formacaoQuery = createQuery({
		queryKey: ['pesquisador-formacao'],
		queryFn: async ({ signal }) => PesquisadoresService.formacoes($page.params.siape!, { signal })
	});

	$: formacaoGraphQuery = createQuery({
		queryKey: ['pesquisador-formacao-graph'],
		queryFn: async ({ signal }) =>
			PesquisadoresService.formacoesGraph($page.params.siape!, { signal })
	});
</script>

<PesquisadorSection class="lg:grid-cols-1">
	<PesquisadorCard title="Formacação Acadêmica" query={formacaoQuery}>
		<ul class="divide-x-foreground space-y-2 divide-y">
			{#if $formacaoQuery.data}
				{#each $formacaoQuery.data as formacao (formacao.curso.id)}
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

	<!-- <PesquisadorCard
		title="Conexões por Formação Acadêmica"
		query={formacaoGraphQuery}
		contentClass="h-[420px]"
	>
		{#if $formacaoGraphQuery.data}
			<FormacaoGraph data={$formacaoGraphQuery.data} />
		{/if}
	</PesquisadorCard> -->
</PesquisadorSection>
