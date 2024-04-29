<script lang="ts">
	export let color: string;
    export let text: string;
</script>

<div class="border-l-4 pl-2 h-full" style={`border-color: ${color}`}><span>{text}</span></div>
