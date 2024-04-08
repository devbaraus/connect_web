<script lang="ts">
	import { page } from '$app/stores';
	import { ProducoesService } from '$lib/services/producoes-service';
	import { TipoProducaoSingular, type ProducoesData } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		createSvelteTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptions,
		flexRender
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import DataTable from '../ui/data-table.svelte';
	import PesquisadorDataTableAction from '../pesquisadores/PesquisadorDataTableAction.svelte';

	let campus = '';
	let grandeArea = '';
	let area = '';
	let anoLte = '';
	let anoGte = '';
	let timeout: NodeJS.Timeout;

	const defaultColumns: ColumnDef<ProducoesData>[] = [
		{
			accessorKey: 'tipo',
			header: () => 'Tipo de Produção',
			cell: ({ row }) =>
				TipoProducaoSingular[row.getValue('tipo') as keyof typeof TipoProducaoSingular]
		},
		{
			accessorKey: 'ano',
			header: () => 'Ano de Publicação'
		},
		{
			accessorKey: 'titulo',
			header: () => 'Título'
		},
		{
			accessorKey: 'curriculo.nome_completo',
			header: () => 'Autor'
		},
		{
			accessorKey: 'id',
			header: () => 'Ações',
			cell: ({ row }) =>
				flexRender(PesquisadorDataTableAction, { siape: row.original.curriculo.siape })
		}
	];

	const options = writable<TableOptions<ProducoesData>>({
		data: [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const table = createSvelteTable(options);

	const query = createQuery({
		queryKey: ['searchResearchers'],
		queryFn: async () =>
			await ProducoesService.list({
				campus,
				grandeArea,
				area,
				anoLte: anoLte ? parseInt(anoLte) : undefined,
				anoGte: anoGte ? parseInt(anoGte) : undefined,
				page: 0,
				pageSize: 50
			}).then((data) => {
				options.update((o) => ({ ...o, data: data.results }));
				return data;
			}),
		enabled: false
	});

	$: {
		campus = $page.url.searchParams.get('campus') || '';
		grandeArea = $page.url.searchParams.get('grande_area') || '';
		area = $page.url.searchParams.get('area') || '';
		anoLte = $page.url.searchParams.get('ano_lte') || '';
		anoGte = $page.url.searchParams.get('ano_gte') || '';

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			$query.refetch();
		}, 500);
	}
</script>

{#if $query.isLoading}
	<p>Loading...</p>
{:else if $query.isError}
	<p>Error: {$query.error.message}</p>
{:else if $query.data?.results.length === 0}
	<p>No results found</p>
{:else if $query.data?.results.length}
	<DataTable {table} caption={`Total de ${$query.data.total} publicações encontradas`} />
{/if}
