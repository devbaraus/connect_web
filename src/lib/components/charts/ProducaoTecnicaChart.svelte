<script lang="ts">
	import { EnumProducaoTecnica, EnumProjetoPesquisa, type ProjetoPesquisaStats } from '$lib/types';
	import BaseChart from '$lib/components/charts/BaseChart.svelte';

	export let data: ProjetoPesquisaStats[];
	export let events: Record<string, (params: object) => void> = {};
</script>

<BaseChart
	key="producao-tecnica"
	kind="natureza"
	display="ano"
	labels={EnumProducaoTecnica}
	{data}
	{events}
/>
