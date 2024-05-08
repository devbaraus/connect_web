<script lang="ts">
	import {
		type CurriculoNode,
		EnumProducaoBibliografica,
		type OrientacaoGraph,
		type OrientacaoNode,
		EnumOrientacao
	} from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';
	import { goto } from '$app/navigation';
	import PesquisadorTooltip from '$lib/components/graphs/tooltips/PesquisadorTooltip.svelte';
	import ProducaoBibliograficaTooltip from '$lib/components/graphs/tooltips/ProducaoBibliograficaTooltip.svelte';
	import TooltipGraph from '$lib/components/graphs/TooltipGraph.svelte';
	import { scrollHightlight } from '$lib/utils';
	import OrientacaoTooltip from './tooltips/OrientacaoTooltip.svelte';

	const tooltip = 'orientacao-tooltip';

	let node: CurriculoNode | OrientacaoNode;

	export let data: OrientacaoGraph;

	const existingKeys = new Set(
		data.nodes
			.map((n) => {
				if (n.node === 'Orientacao') {
					return n.natureza;
				}
				return null;
			})
			.filter((k) => k !== null)
	);
	const keys = Object.keys(EnumOrientacao).filter((k) => existingKeys.has(k));

	const nodes = data.nodes.map((n) => ({
		...n,
		group: n.node === 'Orientacao' ? n.natureza : 'CURRICULO',
		color: n.node === 'Orientacao' ? base.color[keys.indexOf(n.natureza)] : '#626c91',
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

			if (d.node === 'Orientacao') {
				const row = document.querySelector(`tr:has(#orientacao-${d.uid})`);

				scrollHightlight(row, d.color);
			}
		}
	};
</script>

<TooltipGraph {tooltip}>
	{#if node?.node === 'Curriculo'}
		<PesquisadorTooltip {node} />
	{:else if node?.node === 'Orientacao'}
		<OrientacaoTooltip {node} />
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
