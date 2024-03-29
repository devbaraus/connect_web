<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/producao-bibliografica-chart.svelte'
	import type { PageData } from './$types';

	export let data: PageData
</script>

<p class="text-center text-2xl font-semibold">
	{data.pesquisador.nome_completo}
</p>

<ProducaoBibliograficaChart data={data.chart} />
