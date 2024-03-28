<script lang="ts">
import Wrapper from '$lib/components/wrapper.svelte';
import { createQuery } from '@tanstack/svelte-query'
import { searchResearchers } from '$lib/services/researchers-service';

let searchQuery = $state('')

const query = createQuery({
	queryKey: ['todos'],
	queryFn: async () => searchResearchers({
		query: searchQuery,
	}),
	enabled: false,
})

$effect(() => {
	if (!searchQuery) {
		return
	}

	$query.refetch({
		cancelRefetch: true,
	})
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
