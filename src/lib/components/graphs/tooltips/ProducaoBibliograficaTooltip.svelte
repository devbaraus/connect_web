<script lang="ts">
	import { EnumProducaoBibliografica, type ProducaoBibliograficaNode } from '$lib/types';

	export let node: ProducaoBibliograficaNode;
</script>

<div class="font-bold">{EnumProducaoBibliografica[node.tipo]}</div>
<div class="mt-2 whitespace-normal">
	<p>{node.titulo}</p>
</div>
