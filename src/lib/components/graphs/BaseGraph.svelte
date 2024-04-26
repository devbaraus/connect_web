<script lang="ts">
	import { graph, type NodeGraph } from '$lib/actions/graph';
	export let data: any;
	export let tooltip: string | undefined = undefined;
	export let actions: Record<string, (d: NodeGraph) => void> | undefined = {};
</script>

{#if !data.nodes.length}
	<p class="flex h-full w-full items-center justify-center text-center">Nenhuma dado encontrado</p>
{:else}
	<div
		use:graph={{
			data,
			tooltip,
			actions
		}}
		class="h-full"
	/>
{/if}
