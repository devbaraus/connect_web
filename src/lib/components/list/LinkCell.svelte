<script lang="ts">
	import { cn } from "$lib/utils";
	import { ExternalLinkIcon } from "lucide-svelte";

	export let slot;
</script>

<a href={$$props['href']} {...$$props} target="_blank" class={cn('underline inline-flex gap-2 items-center', $$props['class'])}>
    <span>
        {slot}
    </span>
    <!-- <ExternalLinkIcon class="text-foreground/80" size="14"/> -->
</a>
