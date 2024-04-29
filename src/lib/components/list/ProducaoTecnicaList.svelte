<script lang="ts">
	import {
		EnumProducaoTecnica,
		type ProducaoBibliografica,
		type ProducaoTecnica
	} from '$lib/types';
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

	export let data: ProducaoTecnica[];

	const existingKeys = new Set(data.map((n) => n.natureza).filter((k) => k !== null));
	const keys = Object.keys(EnumProducaoTecnica).filter((k) => existingKeys.has(k));

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

	const defaultColumns: ColumnDef<ProducaoTecnica>[] = [
		{
			accessorKey: 'natureza',
			header: () => 'Natureza',
			cell: ({ row }) =>
				flexRender(ColoredBorderCell, {
					id: `producao-tecnica-${row.original.id}`,
					color: base.color[keys.indexOf(row.getValue('natureza'))],
					slot: EnumProducaoTecnica[row.getValue('natureza') as keyof typeof EnumProducaoTecnica]
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

	const options = writable<TableOptions<ProducaoTecnica>>({
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

<DataTable {table} caption={`Total de ${data.length} produções técnicas encontradas`} />
