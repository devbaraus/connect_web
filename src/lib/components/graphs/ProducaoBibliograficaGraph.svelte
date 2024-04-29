<script lang="ts">
	import {
		type CurriculoNode,
		EnumProducaoBibliografica,
		type ProducaoBibliograficaGraph,
		type ProducaoBibliograficaNode
	} from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';
	import { goto } from '$app/navigation';
	import PesquisadorTooltip from '$lib/components/graphs/tooltips/PesquisadorTooltip.svelte';
	import ProducaoBibliograficaTooltip from '$lib/components/graphs/tooltips/ProducaoBibliograficaTooltip.svelte';
	import TooltipGraph from '$lib/components/graphs/TooltipGraph.svelte';

	const tooltip = 'producao-bibliografica-tooltip';

	let node: CurriculoNode | ProducaoBibliograficaNode;

	export let data: ProducaoBibliograficaGraph;

	const existingKeys = new Set(
		data.nodes
			.map((n) => {
				if (n.node === 'ProducaoBibliografica') {
					return n.tipo;
				}
				return null;
			})
			.filter((k) => k !== null)
	);
	const keys = Object.keys(EnumProducaoBibliografica).filter((k) => existingKeys.has(k));

	const nodes = data.nodes.map((n) => ({
		...n,
		group: n.node === 'ProducaoBibliografica' ? n.tipo : 'CURRICULO',
		color: n.node === 'ProducaoBibliografica' ? base.color[keys.indexOf(n.tipo)] : '#626c91',
		class: n.node === 'ProducaoBibliografica' ? '' : 'hover:cursor-pointer'
	}));

	const actions = {
		mouseover: (d) => {
			node = d;
		},
		click: (d) => {
			if (d.node === 'Curriculo') {
				goto(`/pesquisadores/${d.siape}`);
			}
		}
	};
</script>

<TooltipGraph {tooltip}>
	{#if node?.node === 'Curriculo'}
		<PesquisadorTooltip {node} />
	{:else if node?.node === 'ProducaoBibliografica'}
		<ProducaoBibliograficaTooltip {node} />
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