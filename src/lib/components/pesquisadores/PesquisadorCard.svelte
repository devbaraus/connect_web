<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';
	import { type CreateQueryResult } from '@tanstack/svelte-query';
	import Loader from '../ui/Loader.svelte';

	export let query: CreateQueryResult | undefined = undefined;
	export let title: string;
	export let contentClass: string | undefined = undefined;

	let className: string | undefined = undefined;
	export { className as class };
</script>

<Card.Root class={cn('shadow-none', className)}>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
	</Card.Header>
	<Card.Content class={contentClass}>
		{#if $query?.isFetching}
			<div class="flex h-full w-full items-center justify-center">
				<Loader />
			</div>
		{:else}
			<slot />
		{/if}
	</Card.Content>
</Card.Root>
