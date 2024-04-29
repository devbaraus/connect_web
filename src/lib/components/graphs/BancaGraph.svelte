<script lang="ts">
	import { type BancaGraph, type BancaNode, type CurriculoNode } from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';
	import PesquisadorTooltip from '$lib/components/graphs/tooltips/PesquisadorTooltip.svelte';
	import BancaTooltip from '$lib/components/graphs/tooltips/BancaTooltip.svelte';
	import { goto } from '$app/navigation';
	import TooltipGraph from '$lib/components/graphs/TooltipGraph.svelte';
	import { scrollHightlight } from '$lib/utils';

	const tooltip = 'banca-tooltip';

	let node: CurriculoNode | BancaNode;

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
		color: n.node === 'Banca' ? base.color[keys.indexOf(n.natureza)] : '#626c91',
		class: 'hover:cursor-pointer'
	}));

	const actions = {
		mouseover: (d) => {
			node = d;
		},
		click: (d) => {
			if (d.node === 'Curriculo') {
				goto(`/pesquisadores/${d.siape}`);
			}

			if (d.node === 'Banca') {
				const row = document.querySelector(`tr:has(#banca-${d.uid})`);

				scrollHightlight(row, d.color);
			}
		}
	};
</script>

<TooltipGraph {tooltip}>
	{#if node?.node === 'Curriculo'}
		<PesquisadorTooltip {node} />
	{:else if node?.node === 'Banca'}
		<BancaTooltip {node} />
	{/if}
</TooltipGraph>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
	{tooltip}
	{actions}
/>
