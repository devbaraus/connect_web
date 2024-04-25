<script lang="ts">
	import { type ChartOptions } from '$lib/actions/chart';
	import { type BancaStats } from '$lib/types';
	import BaseChart from '$lib/components/charts/BaseChart.svelte';

	export let data: BancaStats[];
	export let events: Record<string, (params: object) => void> = {};

	let labels = data.reduce(
		(acc, d) => {
			acc[d.natureza] = d.natureza;
			return acc;
		},
		{} as Record<string, string>
	);
</script>

<BaseChart key="banca" kind="natureza" display="ano" {data} {labels} {events} />
