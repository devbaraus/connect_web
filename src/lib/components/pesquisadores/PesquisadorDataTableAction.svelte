<script>
	import { Button } from '$lib/components/ui/button'
	import { EyeIcon } from 'lucide-svelte';
	export let siape;
</script>
<Button href="/pesquisadores/{siape}" class="uppercase inline-flex gap-2"><span>Visitar</span> <EyeIcon class="h-4 w-4"/></Button>