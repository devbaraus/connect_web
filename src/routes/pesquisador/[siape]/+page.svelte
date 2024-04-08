<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte'
	import type { PageData } from './$types';

	export let data: PageData
</script>

<p class="text-center text-2xl font-semibold">
	{data.pesquisador.nome_completo}
</p>

<ProducaoBibliograficaChart data={data.producoes} />

<ul>
	{#each data.formacao as formacao (formacao.id)}
		<li><span class="font-bold">{formacao.tipo.replace('_', ' ')}</span>: ({formacao.ano_inicio}~{formacao.ano_conclusao})</li>
	{/each}
</ul>
