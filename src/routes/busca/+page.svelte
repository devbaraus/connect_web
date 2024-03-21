<script lang="ts">
import Wrapper from '$lib/components/wrapper.svelte';
import { createQuery } from '@tanstack/svelte-query'
import { debounce } from '$lib/utils';
import { searchResearchers } from '$lib/services/researchers-service';

let searchQuery = $state('')

const query = createQuery({
	queryKey: ['todos'],
	queryFn: async () => searchResearchers({
		query: searchQuery,
	}),
	enabled: false,
})

const debouncedRefetch = debounce(() => {
	$query.refetch({
		cancelRefetch: true,
	})
}, 500)

$effect(() => {
	if (!searchQuery) {
		return
	}

	debouncedRefetch()
})

</script>

<Wrapper>
	<h1>Search - {searchQuery}</h1>
	<input type="text" bind:value={searchQuery}>
	{#if $query.data}
		<ul>
			{#each $query.data.results as article}
				<li>{article.nome_completo}</li>
			{/each}
		</ul>
	{/if}
</Wrapper>
