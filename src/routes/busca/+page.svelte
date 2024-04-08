<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import { Input } from '$lib/components/ui/input';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import type { Researcher } from '$lib/types';
	import DataTable from '$lib/components/ui/data-table.svelte';
	import PesquisadorDataTableAction from '$lib/components/pesquisadores/PesquisadorDataTableAction.svelte';

	let searchQuery = '';
	let timeout: NodeJS.Timeout;

	const defaultColumns: ColumnDef<Researcher>[] = [
		{
			accessorKey: 'siape',
			header: () => 'Siape'
		},
		{
			accessorKey: 'nome_completo',
			header: () => 'Nome Completo'
		},
		{
			accessorKey: 'actions',
			header: () => 'Ações',
			cell: ({ row }) => flexRender(PesquisadorDataTableAction, { id: row.getValue('siape') })
		}
	];

	const options = writable<TableOptions<Researcher>>({
		data: [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const query = createQuery({
		queryKey: ['searchResearchers'],
		queryFn: async () => {
			const { results } = await PesquisadoresService.list({
				query: searchQuery
			});
			options.update((o) => ({ ...o, data: results }));

			return results;
		}
	});

	$: {
		if (typeof searchQuery == 'string') {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				$query.refetch();
			}, 500);
		}
	}

	const table = createSvelteTable(options);
</script>

<div class="mb-8">
	<h1>Search - {searchQuery}</h1>
	<Input type="text" bind:value={searchQuery} />
</div>

<DataTable {table} />
