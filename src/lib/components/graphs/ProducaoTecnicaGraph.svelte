<script lang="ts">
	import { EnumProducaoTecnica, type ProducaoTecnicaGraph } from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';

	export let data: ProducaoTecnicaGraph;

	const existingKeys = new Set(
		data.nodes
			.map((n) => {
				if (n.node === 'ProducaoTecnica') {
					return n.natureza;
				}
				return null;
			})
			.filter((k) => k !== null)
	);
	const keys = Object.keys(EnumProducaoTecnica).filter((k) => existingKeys.has(k));

	const nodes = data.nodes.map((n) => ({
		...n,
		group: n.node === 'ProducaoTecnica' ? n.natureza : 'CURRICULO',
		color: n.node === 'ProducaoTecnica' ? base.color[keys.indexOf(n.natureza)] : '#626c91'
	}));
</script>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
/>
