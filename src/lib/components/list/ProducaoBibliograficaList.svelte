<script lang="ts">
	import LinkCell from './LinkCell.svelte';
	import { type ProducaoBibliografica } from '$lib/types';
	import { EnumProducaoBibliografica } from '$lib/types';
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
	import PesquisadorDataTableAction from '../pesquisadores/PesquisadorDataTableAction.svelte';
	import DataTable from '../ui/DataTable.svelte';
	import ColoredBorderCell from './ColoredBorderCell.svelte';
	import base from '$lib/themes/base';

	export let data: ProducaoBibliografica[];

	const existingKeys = new Set(data.map((n) => n.tipo).filter((k) => k !== null));
	const keys = Object.keys(EnumProducaoBibliografica).filter((k) => existingKeys.has(k));

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

	const defaultColumns: ColumnDef<ProducaoBibliografica>[] = [
		{
			accessorKey: 'tipo',
			header: () => 'Tipo de Produção',
			cell: ({ row }) =>
				flexRender(ColoredBorderCell, {
					id: `producao-bibliografica-${row.original.id}`,
					color: base.color[keys.indexOf(row.getValue('tipo'))],
					slot: EnumProducaoBibliografica[
						row.getValue('tipo') as keyof typeof EnumProducaoBibliografica
					]
				})
		},
		{
			accessorKey: 'titulo',
			header: () => 'Título',
			cell: ({ row }) => {
				if(row.original.doi) {
					return flexRender(LinkCell, { href: `https://dx.doi.org/${row.original.doi}`, slot: row.getValue('titulo')})
				}
				return row.getValue('titulo');
			} 
		},
		{
			accessorKey: 'ano',
			header: () => 'Ano'
		},
		{
			accessorKey: 'revista.qualificacao',
			header: () => 'Qualis'
		}
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

	const options = writable<TableOptions<ProducaoBibliografica>>({
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

<DataTable {table} caption={`Total de ${data.length} publicações bibliográficas encontradas`} />
