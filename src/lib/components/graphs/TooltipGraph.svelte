<script lang="ts">
	export let tooltip: string;
</script>

<div class="hidden">
	<div id={tooltip} class="w-[240px] whitespace-normal text-pretty px-2 text-sm">
		<slot />
	</div>
</div>
