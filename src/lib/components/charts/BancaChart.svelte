<script lang="ts">
	import { type ChartOptions } from '$lib/actions/chart';
	import { type BancaStats } from '$lib/types';
	import BaseChart from '$lib/components/charts/BaseChart.svelte';

	export let data: BancaStats[];
	export let events: Record<string, (params: object) => void> = {};

	let labels = data
		.map((d) => d.natureza)
		.sort((a, b) => a.localeCompare(b))
		.reduce(
			(acc, cur) => {
				acc[cur] = cur;
				return acc;
			},
			{} as Record<string, string>
		);
</script>

<BaseChart key="banca" kind="natureza" display="ano" {data} {labels} {events} />
