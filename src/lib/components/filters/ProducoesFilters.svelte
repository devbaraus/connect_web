<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { addSearchParam } from '$lib/utils';
	import type { Selected } from 'bits-ui';

	export let campuses: string[];
	export let grandesAreas: string[];
	export let areas: string[];

    function gotoOption(paramName: string, option: Selected<string>) {
		addSearchParam(option.value, paramName)
	}
</script>

<Select.Root onSelectedChange={(v) => gotoOption('campus',v)}>
	<Select.Trigger>
		<Select.Value placeholder="Câmpus" />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea class="h-72">
			<Select.Item value="">TODOS</Select.Item>
			{#each campuses as campus}
				<Select.Item value={campus}>{campus.toUpperCase()}</Select.Item>
			{/each}
		</ScrollArea>
	</Select.Content>
</Select.Root>
<Select.Root onSelectedChange={(v) => gotoOption('grande_area', v)}>
	<Select.Trigger>
		<Select.Value placeholder="Grande Área do Conhecimento" />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea class="h-72">
			<Select.Item value="">TODAS</Select.Item>
			{#each grandesAreas as grandeArea}
				<Select.Item value={grandeArea} class="capitalize"
					>{grandeArea.replaceAll('_', ' ').toUpperCase()}</Select.Item
				>
			{/each}
		</ScrollArea>
	</Select.Content>
</Select.Root>
<Select.Root onSelectedChange={(v) => gotoOption('area', v)}>
	<Select.Trigger>
		<Select.Value placeholder="Área do Conhecimento" />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea class="h-72">
			<Select.Item value="">TODAS</Select.Item>
			{#each areas as area}
				<Select.Item value={area} class="capitalize">{area}</Select.Item>
			{/each}
		</ScrollArea>
	</Select.Content>
</Select.Root>
