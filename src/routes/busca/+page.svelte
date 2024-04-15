<script lang="ts">
	import PesquisadorDataTableAction from '$lib/components/pesquisadores/PesquisadorDataTableAction.svelte';
	import DataTable from '$lib/components/ui/data-table.svelte';
	import { Input } from '$lib/components/ui/input';
	import { ApiService } from '$lib/services/api-service';
	import type { Researcher } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	let searchQuery = '';
	let timeout: NodeJS.Timeout;

	const defaultColumns: ColumnDef<Researcher>[] = [
		{
			accessorKey: 'siape',
			header: () => 'Siape'
		},
		{
			accessorKey: 'nome',
			header: () => 'Nome Completo'
		},
		{
			accessorKey: 'actions',
			header: () => 'Ações',
			cell: ({ row }) => flexRender(PesquisadorDataTableAction, { siape: row.getValue('siape') })
		}
	];

	const options = writable<TableOptions<Researcher>>({
		data: [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const query = createQuery({
		queryKey: ['search_pesquisadores', searchQuery],
		queryFn: async ({ signal }) => {
			try {
				const { hits } = await ApiService.busca(searchQuery, { signal });
				options.update((o) => ({ ...o, data: hits }));
				return hits;
			} catch (e) {
				console.error(e);
				return [];
			}
		},
		enabled: true
	});

	$: {
		if (typeof searchQuery === 'string') {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				$query.refetch();
			}, 300);
		}
	}

	const table = createSvelteTable(options);
</script>

<div class="mb-8">
	<h1>Search - {searchQuery}</h1>
	<Input type="text" bind:value={searchQuery} />
</div>

<DataTable {table} />
