<script lang="ts">
	import Cell from './Cell.svelte';
	import { EnumProjetoPesquisa, EnumProjetoPesquisaSituacao, type ProjetoPesquisa } from '$lib/types';

	import base from '$lib/themes/base';
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

	export let data: ProjetoPesquisa[];

	const existingKeys = new Set(data.map((n) => n.natureza).filter((k) => k !== null));
	const keys = Object.keys(EnumProjetoPesquisa).filter((k) => existingKeys.has(k));

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

	const defaultColumns: ColumnDef<ProjetoPesquisa>[] = [
		{
			accessorKey: 'natureza',
			header: () => 'Natureza',
			cell: ({ row }) =>
				flexRender(ColoredBorderCell, {
					color: base.color[keys.indexOf(row.getValue('natureza'))],
					text: EnumProjetoPesquisa[row.getValue('natureza') as keyof typeof EnumProjetoPesquisa]
				})
		},
		
		{
			accessorKey: 'nome',
			header: () => 'Nome'
		},
		{
			accessorKey: 'ano_fim',
			header: () => 'Ano',
			cell: ({row}) => flexRender(Cell, {slot: `${row.original.ano_inicio} - ${row.getValue('ano_fim') || '~'}`, class:'whitespace-nowrap'}),
			enableSorting: false
		},
		{
			accessorKey: 'situacao',
			header: () => 'Situação',
			cell: ({row}) => flexRender(Cell, {slot: EnumProjetoPesquisaSituacao[row.getValue('situacao') as keyof typeof EnumProjetoPesquisaSituacao], class:'whitespace-nowrap'})
		},
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

	const options = writable<TableOptions<ProjetoPesquisa>>({
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

<DataTable {table} caption={`Total de ${data.length} projetos de pesquisa encontrados`} />
