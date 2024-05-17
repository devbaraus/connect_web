<script>
	import { Button } from '$lib/components/ui/button'
	import { ExternalLinkIcon, EyeIcon } from 'lucide-svelte';
	export let pesquisador;
</script>
<div class="flex gap-4">
	<Button href={`/pesquisadores/${pesquisador.siape}`} class="uppercase inline-flex items-center gap-2"><span>Visitar</span> <EyeIcon class="h-4 w-4"/></Button>
	<Button href={`https://lattes.cnpq.br/${pesquisador.cnpq}`} class="uppercase inline-flex items-center gap-2" target='_blank'><span>Lattes</span> <ExternalLinkIcon class="size-4"/></Button>
</div>