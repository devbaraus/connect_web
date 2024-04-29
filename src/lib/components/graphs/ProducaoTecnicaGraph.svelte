<script lang="ts">
	import {
		type CurriculoNode,
		EnumProducaoTecnica,
		type ProducaoTecnicaGraph,
		type ProducaoTecnicaNode
	} from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';
	import PesquisadorTooltip from '$lib/components/graphs/tooltips/PesquisadorTooltip.svelte';
	import { goto } from '$app/navigation';
	import ProducaoTecnicaTooltip from '$lib/components/graphs/tooltips/ProducaoTecnicaTooltip.svelte';
	import TooltipGraph from '$lib/components/graphs/TooltipGraph.svelte';
	import { scrollHightlight } from '$lib/utils';

	const tooltip = 'producao-tecnica-tooltip';

	let node: CurriculoNode | ProducaoTecnicaNode;

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
		color: n.node === 'ProducaoTecnica' ? base.color[keys.indexOf(n.natureza)] : '#626c91',
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

			if (d.node === 'ProducaoTecnica') {
				const row = document.querySelector(`tr:has(#producao-tecnica-${d.uid})`);

				scrollHightlight(row, d.color);
			}
		}
	};
</script>

<TooltipGraph {tooltip}>
	{#if node?.node === 'Curriculo'}
		<PesquisadorTooltip {node} />
	{:else if node?.node === 'ProducaoTecnica'}
		<ProducaoTecnicaTooltip {node} />
	{/if}
</TooltipGraph>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
	{actions}
	{tooltip}
/>
