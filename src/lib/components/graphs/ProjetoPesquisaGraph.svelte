<script lang="ts">
	import { EnumProducaoTecnica, EnumProjetoPesquisa, type ProjetoPesquisaGraph } from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';

	export let data: ProjetoPesquisaGraph;

	const existingKeys = new Set(
		data.nodes
			.map((n) => {
				if (n.node === 'ProjetoPesquisa') {
					return n.natureza;
				}
				return null;
			})
			.filter((k) => k !== null)
	);
	const keys = Object.keys(EnumProjetoPesquisa).filter((k) => existingKeys.has(k));

	const nodes = data.nodes.map((n) => ({
		...n,
		group: n.node === 'ProjetoPesquisa' ? n.natureza : 'CURRICULO',
		color: n.node === 'ProjetoPesquisa' ? base.color[keys.indexOf(n.natureza)] : '#626c91'
	}));
</script>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
/>
