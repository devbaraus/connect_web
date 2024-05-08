<script lang="ts">
	import base from '$lib/themes/base';
	import { EnumOrientacao, type Banca, type Orientacao } from '$lib/types';
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

	export let data: Orientacao[];

	const existingKeys = new Set(data.map((n) => n.natureza).filter((k) => k !== null));
	const keys = Object.keys(EnumOrientacao).filter((k) => existingKeys.has(k));

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

	const defaultColumns: ColumnDef<Orientacao>[] = [
		{
			accessorKey: 'natureza',
			header: () => 'Natureza',
			cell: ({ row }) =>
				flexRender(ColoredBorderCell, {
					id: `orientacao-${row.original.id}`,
					color: base.color[keys.indexOf(row.getValue('natureza'))],
					class: 'capitalize',
					slot: EnumOrientacao[row.getValue('natureza') as keyof typeof EnumOrientacao]
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

	const options = writable<TableOptions<Orientacao>>({
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

<DataTable {table} caption={`Total de ${data.length} orientações`} />
