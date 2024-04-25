<script lang="ts">
	import { EnumProjetoPesquisa, type ProjetoPesquisaStats } from '$lib/types';
	import BaseChart from '$lib/components/charts/BaseChart.svelte';

	export let data: ProjetoPesquisaStats[];
	export let events: Record<string, (params: object) => void> = {};
</script>

<BaseChart
	key="projeto-pesquisa"
	kind="natureza"
	display="ano"
	labels={EnumProjetoPesquisa}
	{data}
	{events}
/>
