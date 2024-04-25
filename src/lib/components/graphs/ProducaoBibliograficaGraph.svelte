<script lang="ts">
	import { EnumProducaoBibliografica, type ProducaoBibliograficaGraph } from '$lib/types';
	import BaseGraph from '$lib/components/graphs/BaseGraph.svelte';
	import base from '$lib/themes/base';
	import { goto } from '$app/navigation';

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
		tooltip:
			n.node === 'ProducaoBibliografica'
				? '<div class="w-[240px] px-2 text-sm">\n' +
					'  <div class="font-bold">' +
					EnumProducaoBibliografica[n.tipo] +
					'</div>\n' +
					'  <div class="mt-2 whitespace-normal">\n' +
					'    <p>' +
					n.titulo +
					'</p>\n' +
					'  </div>\n' +
					'</div>'
				: '<div class="w-[240px] px-2 text-sm">\n' +
					'  <div class="font-bold">Pesquisador</div>\n' +
					'  <div class="mt-2 whitespace-normal">\n' +
					'    <p>' +
					n.nome +
					'</p>\n' +
					'  </div>\n' +
					'</div>',
		actions: {
			click: () => {
				if (n.node === 'Curriculo') {
					goto(`/pesquisadores/${n.siape}`);
				}
			}
		}
	}));
</script>

<BaseGraph
	data={{
		nodes,
		links: data.links
	}}
/>
