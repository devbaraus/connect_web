<script lang="ts">
	import { type BancaGraph } from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';

	export let data: BancaGraph;

	const keys = Array.from(
		new Set(
			data.nodes
				.map((n) => {
					if (n.node === 'Banca') {
						return n.natureza;
					}
					return null;
				})
				.filter((k) => k !== null)
		)
	).sort((a, b) => a.localeCompare(b));

	const nodes = data.nodes.map((n) => ({
		...n,
		group: n.node === 'Banca' ? n.natureza : 'CURRICULO',
		color: n.node === 'Banca' ? base.color[keys.indexOf(n.natureza)] : '#626c91'
	}));
</script>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
/>
