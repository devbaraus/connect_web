<script lang="ts">
	import {
		type CurriculoNode,
		EnumProducaoTecnica,
		EnumProjetoPesquisa,
		type ProjetoPesquisaGraph,
		type ProjetoPesquisaNode
	} from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';
	import { goto } from '$app/navigation';
	import PesquisadorTooltip from '$lib/components/graphs/tooltips/PesquisadorTooltip.svelte';
	import ProducaoBibliograficaTooltip from '$lib/components/graphs/tooltips/ProducaoBibliograficaTooltip.svelte';
	import ProjetoPesquisaTooltip from '$lib/components/graphs/tooltips/ProjetoPesquisaTooltip.svelte';
	import TooltipGraph from '$lib/components/graphs/TooltipGraph.svelte';
	import { scrollHightlight } from '$lib/utils';

	const tooltip = 'projeto-pesquisa-tooltip';

	let node: CurriculoNode | ProjetoPesquisaNode;

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
		color: n.node === 'ProjetoPesquisa' ? base.color[keys.indexOf(n.natureza)] : '#626c91',
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

			if (d.node === 'ProjetoPesquisa') {
				const row = document.querySelector(`tr:has(#projeto-pesquisa-${d.uid})`);

				scrollHightlight(row);
			}
		}
	};
</script>

<TooltipGraph {tooltip}>
	{#if node?.node === 'Curriculo'}
		<PesquisadorTooltip {node} />
	{:else if node?.node === 'ProjetoPesquisa'}
		<ProjetoPesquisaTooltip {node} />
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
