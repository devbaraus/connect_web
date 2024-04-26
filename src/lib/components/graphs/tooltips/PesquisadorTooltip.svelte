<script lang="ts">
	import type { CurriculoNode } from '$lib/types';

	export let node: CurriculoNode;
</script>

<div class="font-bold">Pesquisador</div>
<div class="mt-2">
	<p>{node.nome}</p>
</div>
