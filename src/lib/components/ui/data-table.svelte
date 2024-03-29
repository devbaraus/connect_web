<script>
import { flexRender } from '@tanstack/svelte-table';
import * as Table from "$lib/components/ui/table";
export let table

</script>

<Table.Root>
	<Table.Header>
	{#each $table.getHeaderGroups() as headerGroup}
		<Table.Row>
			{#each headerGroup.headers as header}
				<Table.Head>
					{#if !header.isPlaceholder}
						<svelte:component
							this={flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
						/>
					{/if}
				</Table.Head>
			{/each}
		</Table.Row>
	{/each}
	</Table.Header>
	<Table.Body>
	{#each $table.getRowModel().rows as row}
		<Table.Row>
			{#each row.getVisibleCells() as cell}
				<Table.Cell>
					<svelte:component
						this={flexRender(cell.column.columnDef.cell, cell.getContext())}
					/>
				</Table.Cell>
			{/each}
		</Table.Row>
	{/each}
	</Table.Body>
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