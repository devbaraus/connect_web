<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/producao-bibliografica-chart.svelte'
	import type { PageData } from './$types';

	export let data: PageData
</script>

<p class="text-center text-2xl font-semibold">
	{data.pesquisador.nome_completo}
</p>

<ProducaoBibliograficaChart data={data.producoes} />

<ul>
	{#each data.formacao as formacao (formacao.id)}
		<li><span class="font-bold">{formacao.tipo_formacao.replace('_', ' ')}</span>: {formacao.nome_curso} ({formacao.ano_inicio}~{formacao.ano_conclusao})</li>
	{/each}
</ul>
