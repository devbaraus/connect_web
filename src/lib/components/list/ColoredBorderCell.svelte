<script lang="ts">
	export let color: string;
    export let text: string;
</script>

<div class="h-full before:absolute before:border-l-4 before:h-full before:top-0 before:left-0 before:border-inherit" style={`border-color: ${color}`}><span>{text}</span></div>
