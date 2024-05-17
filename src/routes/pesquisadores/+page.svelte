<script lang="ts">
	import PesquisadorDataTableAction from '$lib/components/pesquisadores/PesquisadorDataTableAction.svelte';
	import { searchHits } from '$lib/stores/search';
	import DataTable from '$lib/components/ui/DataTable.svelte';
	import type { PesquisadorSearch } from '$lib/types';
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	const defaultColumns: ColumnDef<PesquisadorSearch>[] = [
		// {
		// 	accessorKey: 'siape',
		// 	header: () => 'Siape'
		// },
		{
			accessorKey: 'nome',
			header: () => 'Nome Completo'
		},
		{
			accessorKey: 'actions',
			header: () => 'Ações',
			enableSorting: false,
			cell: ({ row }) => flexRender(PesquisadorDataTableAction, { pesquisador: row.original })
		}
	];

	const options = writable<TableOptions<PesquisadorSearch>>({
		data: [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	$: {
		options.update((o) => ({ ...o, data: $searchHits }));
	}

	const table = createSvelteTable(options);
</script>

<DataTable {table} />
