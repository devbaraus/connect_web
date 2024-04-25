<script lang="ts">
	import PesquisadorDataTableAction from '$lib/components/pesquisadores/PesquisadorDataTableAction.svelte';
	import DataTable from '$lib/components/ui/data-table.svelte';
	import { Input } from '$lib/components/ui/input';
	import { PesquisadoresService } from '$lib/services/pesquisadores-service';
	import type { PesquisadorSearch } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';
	import type { ColumnDef, TableOptions } from '@tanstack/svelte-table';
	import { createSvelteTable, flexRender, getCoreRowModel } from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';

	let searchQuery = '';
	let timeout: NodeJS.Timeout;

	const defaultColumns: ColumnDef<PesquisadorSearch>[] = [
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

	const options = writable<TableOptions<PesquisadorSearch>>({
		data: [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel()
	});

	const query = createQuery({
		queryKey: ['search_pesquisadores', searchQuery],
		queryFn: async ({ signal }) => {
			try {
				const data = await PesquisadoresService.list({
					query: searchQuery,
					page: 1,
					page_size: 10
				}, { signal });
				options.update((o) => ({ ...o, data: data.hits }));
				return data;
			} catch (e) {
				console.error(e);
				return { hits: [], query: searchQuery, processingTimeMs: 0, limit: 0, offset: 0, estimatedTotalHits: 0 };
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
	<Input type="text" bind:value={searchQuery} placeholder="Pesquise por nome do pesquisador, citação bibliográfica, produção bibliográfica, formação acadêmica ou palavra chave" />
</div>

<DataTable {table} />
