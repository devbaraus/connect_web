<script lang="ts">
	import { type BancaGraph, type FormacaoGraph } from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';

	export let data: FormacaoGraph;

	const keys = Array.from(
		new Set(
			data.nodes
				.map((n) => {
					if (n.node === 'Curso') {
						return n.nome;
					}
					return null;
				})
				.filter((k) => k !== null)
		)
	).sort((a, b) => a.localeCompare(b));

	const nodes = data.nodes.map((n) => ({
		...n,
		group: n.node === 'Curso' ? n.nome : 'CURRICULO',
		color: n.node === 'Curso' ? base.color[keys.indexOf(n.nome)] : '#626c91'
	}));
</script>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
/>
