<script lang="ts">
	import {
		EnumProducaoBibliografica,
		EnumProducaoTecnica,
		type ProducaoBibliograficaNode,
		type ProducaoTecnicaNode
	} from '$lib/types';

	export let node: ProducaoTecnicaNode;
</script>

<div class="font-bold">{EnumProducaoTecnica[node.natureza]}</div>
<div class="mt-2 whitespace-normal">
	<p>{node.titulo}</p>
</div>
