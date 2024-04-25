<script lang="ts">
	import { type ProducaoBibliograficaStats, EnumFormacaoAcademica } from '$lib/types';

	import BaseChart from '$lib/components/charts/BaseChart.svelte';

	export let data: ProducaoBibliograficaStats[];
	export let display: 'data' | 'categoria' = 'data';
	export let events: Record<string, (params: object) => void> = {};
</script>

<BaseChart
	key="formacao-academica"
	kind="tipo"
	display={display === 'data' ? 'ano' : 'grande_area'}
	labels={EnumFormacaoAcademica}
	{data}
	{events}
/>
