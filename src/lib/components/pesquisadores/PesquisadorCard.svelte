<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { HTMLAttributes } from 'svelte/elements';
	import Header from '../layout/Header.svelte';
	import Loader from '../ui/Loader.svelte';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	export let query: any;
	export let title: string;

	export let contentClass: string;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Card.Root class={cn('shadow-none', className)}>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
	</Card.Header>
	<Card.Content class={contentClass}>
		{#if $query.isFetching}
			<div class="flex h-full w-full items-center justify-center">
				<Loader />
			</div>
		{:else if $query.data}
			<slot />
		{/if}
	</Card.Content>
</Card.Root>
