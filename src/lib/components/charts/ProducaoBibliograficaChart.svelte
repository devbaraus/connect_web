<script lang="ts">
	import {
		EnumProducaoBibliografica,
		type ProducaoBibliograficaStats,
		EnumQualis
	} from '$lib/types';

	import BaseChart from '$lib/components/charts/BaseChart.svelte';

	export let data: ProducaoBibliograficaStats[];
	export let kind: 'tipo' | 'qualis' = 'tipo';
	export let display: 'data' | 'categoria' = 'data';
	export let events: Record<string, (params: object) => void> = {};
</script>

<BaseChart
	key="producao-bibliografica"
	kind={kind === 'tipo' ? 'tipo' : 'qualis'}
	display={display === 'data' ? 'ano' : 'grande_area'}
	labels={kind === 'tipo' ? EnumProducaoBibliografica : EnumQualis}
	{data}
	{events}
/>
