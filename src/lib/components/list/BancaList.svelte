<script lang="ts">
	import base from '$lib/themes/base';
	import { type Banca } from '$lib/types';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type SortingState,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import DataTable from '../ui/DataTable.svelte';
	import ColoredBorderCell from './ColoredBorderCell.svelte';

	export let data: Banca[];

	const keys = Array.from(new Set(data.map((n) => n.natureza).filter((k) => k !== null))).sort(
		(a, b) => a.localeCompare(b)
	);

	let sorting: SortingState = [];

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const defaultColumns: ColumnDef<Banca>[] = [
		{
			accessorKey: 'natureza',
			header: () => 'Natureza',
			cell: ({ row }) =>
				flexRender(ColoredBorderCell, {
					id: `banca-${row.original.id}`,
					color: base.color[keys.indexOf(row.getValue('natureza'))],
					slot: row.getValue('natureza')
				})
		},
		{
			accessorKey: 'titulo',
			header: () => 'Título'
		},
		{
			accessorKey: 'ano',
			header: () => 'Ano'
		}
		// {
		// 	accessorKey: 'revista.qualificacao',
		// 	header: () => 'Qualis'
		// }
		// {
		// 	accessorKey: 'curriculo.nome_completo',
		// 	header: () => 'Autor'
		// },
		// {
		// 	accessorKey: 'id',
		// 	header: () => 'Ações',
		// 	cell: ({ row }) =>
		// 		flexRender(PesquisadorDataTableAction, { siape: row.getValue('curriculo.siape') })
		// }
	];

	const options = writable<TableOptions<Banca>>({
		data,
		columns: defaultColumns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	const table = createSvelteTable(options);
</script>

<DataTable {table} caption={`Total de ${data.length} participações em bancas encontradas`} />
