<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import { addSearchParam } from '$lib/utils';
	import type { Selected } from 'bits-ui';
	import { page } from '$app/stores';
	import { ProducoesService } from '$lib/services/producoes-service';

	// export let campuses: Promise<string[]>;
	// export let grandesAreas: Promise<string[]>;
	// export let areas: Promise<string[]>;

	const grandesAreas = ProducoesService.grandeAreas();
	const areas = ProducoesService.area();
	const campuses = ProducoesService.campus();

	const defaultCampus = $page.url.searchParams.get('campus')
		? {
				label: $page.url.searchParams.get('campus')!.toUpperCase(),
				value: $page.url.searchParams.get('campus')!
			}
		: { label: 'TODOS', value: '' };

	const defaultGrandeArea = $page.url.searchParams.get('grande_area')
		? {
				label: $page.url.searchParams.get('grande_area')!.replaceAll('_', ' ').toUpperCase(),
				value: $page.url.searchParams.get('grande_area')!
			}
		: { label: 'TODAS', value: '' };

	const defaultArea = $page.url.searchParams.get('area')
		? {
				label: $page.url.searchParams.get('area')!.toUpperCase(),
				value: $page.url.searchParams.get('area')!
			}
		: { label: 'TODAS', value: '' };

	const defaultKind = $page.url.searchParams.get('kind') || 'tipo';
	const defaultDisplayBy = $page.url.searchParams.get('display_by') || 'data';

	function gotoOption(paramName: string, option: Selected<string> | string) {
		addSearchParam(paramName, typeof option === 'string' ? option : option.value);
	}
</script>

<RadioGroup.Root value={defaultKind} onValueChange={(v) => gotoOption('kind', v)}>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="tipo" id="kind_tipo" />
		<Label for="kind_tipo">Tipo de Produção</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="qualis" id="kind_qualis" />
		<Label for="kind_qualis">Qualis</Label>
	</div>
	<RadioGroup.Input name="spacing" />
</RadioGroup.Root>

<RadioGroup.Root value={defaultDisplayBy} onValueChange={(v) => gotoOption('display_by', v)}>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="data" id="display_data" />
		<Label for="display_data">Data</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="categoria" id="display_categoria" />
		<Label for="display_categoria">Categoria</Label>
	</div>
	<RadioGroup.Input name="spacing" />
</RadioGroup.Root>

<Select.Root selected={defaultCampus} onSelectedChange={(v) => gotoOption('campus', v)}>
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
<Select.Root selected={defaultGrandeArea} onSelectedChange={(v) => gotoOption('grande_area', v)}>
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
<Select.Root selected={defaultArea} onSelectedChange={(v) => gotoOption('area', v)}>
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
