<script lang="ts">
	import { type BancaNode } from '$lib/types';

	export let node: BancaNode;
</script>

<div class="font-bold">{node.natureza}</div>
<div class="mt-2 whitespace-normal">
	<p>{node.titulo}</p>
</div>
