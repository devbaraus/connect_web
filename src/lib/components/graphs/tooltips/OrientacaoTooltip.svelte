<script lang="ts">
	import { EnumOrientacao, type OrientacaoNode } from '$lib/types';

	export let node: OrientacaoNode;
</script>

<div class="font-bold">{EnumOrientacao[node.natureza]}</div>
<div class="mt-2 whitespace-normal">
	<p>{node.titulo}</p>
</div>
