<script lang="ts">
	import { page } from '$app/stores';
	import { ProducoesBibliograficasService } from '$lib/services/producoes-bibliograficas-service';
	import { EnumProducaoBibliograficaSingular, type ProducoesData } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		type ColumnDef,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	import PesquisadorDataTableAction from '../pesquisadores/PesquisadorDataTableAction.svelte';
	import DataTable from '../ui/data-table.svelte';

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
				EnumProducaoBibliograficaSingular[row.getValue('tipo') as keyof typeof EnumProducaoBibliograficaSingular]
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
			await ProducoesBibliograficasService.list({
				// ano_lte: anoLte ? parseInt(anoLte) : undefined,
				// ano_gte: anoGte ? parseInt(anoGte) : undefined,
				// page: 0,
				// pageSize: 50
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
