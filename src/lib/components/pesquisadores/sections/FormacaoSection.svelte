<script lang="ts">
	import { page } from '$app/stores';
	import PesquisadorCard from '$lib/components/pesquisadores/PesquisadorCard.svelte';
	import PesquisadorSection from '$lib/components/pesquisadores/PesquisadorSection.svelte';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { createQuery } from '@tanstack/svelte-query';
	import { getContext } from 'svelte';

	const formacaoQuery = createQuery({
		queryKey: ['pesquisador-formacao'],
		queryFn: async ({ signal }) => PesquisadoresService.formacoes($page.params.siape!, { signal })
	});

	const InfoType = {
		producao_bibliografica: 'Produção Bibliográfica',
		producao_tecnica: 'Produção Técnica',
		banca: 'Banca',
		projeto_pesquisa: 'Projeto de Pesquisa',
		formacao_academica: 'Formação Acadêmica',
		orientacao: 'Orientação'
	};

	let metrics = getContext('metrics');
</script>

<PesquisadorSection class="lg:grid-cols-3">
	<PesquisadorCard title="Métricas do Professor" class="lg:col-span-1">
		<dl class="divide-y-foreground divide-y">
			{#if $metrics}
				{#each Object.entries($metrics) as [key, value]}
					{#if value}
						<div class="grid grid-cols-2 gap-4 px-4 py-6">
							<dt class="font-medium">{InfoType[key]}</dt>
							<dd class="mt-1 text-foreground/80 sm:mt-0">
								{value}
							</dd>
						</div>
					{/if}
				{/each}
			{/if}
		</dl>
	</PesquisadorCard>
	<PesquisadorCard title="Formacação Acadêmica" query={formacaoQuery} class="lg:col-span-2">
		<dl class="divide-y-foreground divide-y">
			{#if $formacaoQuery.data}
				{#each $formacaoQuery.data.sort((a, b) => Number(a.ano_inicio) - Number(b.ano_inicio)) as formacao (formacao.curso.id)}
					<div class="gap-4 px-4 py-6 md:grid md:grid-cols-4">
						<dt class="font-medium">
							{formacao.tipo.replace('_', ' ')}
						</dt>
						<dd class="col-span-3 mt-1 text-foreground/80 sm:mt-0">
							<p>{formacao.curso.nome}</p>

							<time class="block text-sm"
								>Início: {formacao.ano_inicio}<span class="mx-1 text-neutral-300">|</span>Conclusão: {formacao.ano_conclusao}</time
							>
							<p>
								{formacao.instituicao.nome}
							</p>
						</dd>
					</div>
				{/each}
			{/if}
		</dl>
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
