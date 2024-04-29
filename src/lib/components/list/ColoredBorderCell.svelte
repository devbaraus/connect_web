<script lang="ts">
	export let color: string;
	export let slot: string;
</script>

<div
	{...$$props}
	class="h-full before:absolute before:left-0 before:top-0 before:h-full before:border-l-4 before:border-inherit"
	style={`border-color: ${color}`}
>
	<span>{slot}</span>
</div>
