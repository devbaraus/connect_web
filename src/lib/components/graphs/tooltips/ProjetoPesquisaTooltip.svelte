<script lang="ts">
	import {
		EnumProducaoBibliografica,
		EnumProducaoTecnica,
		EnumProjetoPesquisa,
		type ProducaoBibliograficaNode,
		type ProducaoTecnicaNode,
		type ProjetoPesquisaNode
	} from '$lib/types';

	export let node: ProjetoPesquisaNode;
</script>

<div class="font-bold">{EnumProjetoPesquisa[node.natureza]}</div>
<div class="mt-2 whitespace-normal">
	<p>{node.nome}</p>
</div>
