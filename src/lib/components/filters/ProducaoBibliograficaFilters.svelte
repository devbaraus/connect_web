<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { addSearchParam } from '$lib/utils';
	import type { Selected } from 'bits-ui';

	export let campuses: Promise<string[]>;
	export let grandesAreas: Promise<string[]>;
	export let areas: Promise<string[]>;

	function gotoOption(paramName: string, option: Selected<string> | string) {
		addSearchParam( paramName, typeof option === 'string' ? option : option.value);
	}
</script>
<input type="checkbox" on:change={e => gotoOption('qualis', String(e.currentTarget.checked))}>
<Select.Root onSelectedChange={(v) => gotoOption('campus', v)}>
	<Select.Trigger>
		<Select.Value placeholder="Câmpus" />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea class="h-72">
			{#await campuses}
				<Select.Item value="">Carregando...</Select.Item>
			{:then campuses}
				<Select.Item value="">TODOS</Select.Item>
				{#each campuses as campus}
					<Select.Item value={campus}>{campus.toUpperCase()}</Select.Item>
				{/each}
			{:catch error}
				<Select.Item value="">{error}</Select.Item>
			{/await}
		</ScrollArea>
	</Select.Content>
</Select.Root>
<Select.Root onSelectedChange={(v) => gotoOption('grande_area', v)}>
	<Select.Trigger>
		<Select.Value placeholder="Grande Área do Conhecimento" />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea class="h-72">
			{#await grandesAreas}
				<Select.Item value="">Carregando...</Select.Item>
			{:then grandesAreas}
				<ScrollArea class="h-72">
					<Select.Item value="">TODAS</Select.Item>
					{#each grandesAreas as grandeArea}
						<Select.Item value={grandeArea} class="capitalize"
							>{grandeArea.replaceAll('_', ' ').toUpperCase()}</Select.Item
						>
					{/each}
				</ScrollArea>
			{:catch error}
				<Select.Item value="">{error}</Select.Item>
			{/await}
		</ScrollArea>
	</Select.Content>
</Select.Root>
<Select.Root onSelectedChange={(v) => gotoOption('area', v)}>
	<Select.Trigger>
		<Select.Value placeholder="Área do Conhecimento" />
	</Select.Trigger>
	<Select.Content>
		<ScrollArea class="h-72">
			{#await areas}
				<Select.Item value="">Carregando...</Select.Item>
			{:then areas}
				<Select.Item value="">TODAS</Select.Item>
				{#each areas as area}
					<Select.Item value={area} class="capitalize">{area}</Select.Item>
				{/each}
			{:catch error}
				<Select.Item value="">{error}</Select.Item>
			{/await}
		</ScrollArea>
	</Select.Content>
</Select.Root>
