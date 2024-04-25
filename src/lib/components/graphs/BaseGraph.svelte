<script lang="ts">
	import { graph } from '$lib/actions/graph';
	export let data: any;
</script>

{#if !data.nodes.length}
	<p class="flex h-full w-full items-center justify-center text-center">Nenhuma dado encontrado</p>
{:else}
	<div
		use:graph={{
			data
		}}
		class="h-full"
	/>
{/if}
