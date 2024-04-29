<script>
	import { flexRender } from '@tanstack/svelte-table';
	import * as Table from '$lib/components/ui/table';
	import { ChevronDownIcon, ChevronUpIcon } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	export let table;
	export let caption = '';
</script>

<Table.Root>
	<Table.Header>
		{#each $table.getHeaderGroups() as headerGroup}
			<Table.Row>
				{#each headerGroup.headers as header}
					<Table.Head>
						{#if !header.isPlaceholder}
							{#if header.column.getCanSort()}
								<button
									class:cursor-pointer={header.column.getCanSort()}
									class:select-none={header.column.getCanSort()}
									on:click={header.column.getToggleSortingHandler()}
									type="button"
									class="inline-flex w-full items-center justify-between gap-2"
								>
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
									<div class="">
										<ChevronUpIcon
											size="14"
											class={cn(
												header.column.getIsSorted().toString() === 'asc'
													? 'text-foreground'
													: 'text-foreground/30',
												'text-sm'
											)}
										/>
										<ChevronDownIcon
											size="14"
											class={cn(
												header.column.getIsSorted().toString() === 'desc'
													? 'text-foreground'
													: 'text-foreground/30',
												'text-sm'
											)}
										/>
									</div>
								</button>
							{:else}
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						{/if}
					</Table.Head>
				{/each}
			</Table.Row>
		{/each}
	</Table.Header>
	<Table.Body>
		{#each $table.getRowModel().rows as row}
			<Table.Row class="relative">
				{#each row.getVisibleCells() as cell}
					<Table.Cell>
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>

	{#if caption}
		<Table.Caption>
			{caption}
		</Table.Caption>
	{/if}
	<!-- {#if $table.isPaginated}
			{#if $table.isPaginated && $table.isPaginatedTop}
				<Table.Pagination />
			{/if}
		{/if} -->
	<!--	<tfoot>-->
	<!--	{#each $table.getFooterGroups() as footerGroup}-->
	<!--		<tr>-->
	<!--			{#each footerGroup.headers as header}-->
	<!--				<th>-->
	<!--					{#if !header.isPlaceholder}-->
	<!--						<svelte:component-->
	<!--							this={flexRender(-->
	<!--                    header.column.columnDef.footer,-->
	<!--                    header.getContext()-->
	<!--                  )}-->
	<!--						/>-->
	<!--					{/if}-->
	<!--				</th>-->
	<!--			{/each}-->
	<!--		</tr>-->
	<!--	{/each}-->
	<!--	</tfoot>-->
</Table.Root>
