<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { Selected } from 'bits-ui';
	import ProducaoBibliograficaChart from '$lib/components/charts/producao-bibliografica-chart.svelte';

	export let data: PageData;

	function gotoOption(option: Selected<string>, paramName: string) {
		const url = new URL(location.href);
		url.searchParams.set(paramName, option.value);
		goto(url.toString());
	}
</script>

<div class="space-y-4">
	<Select.Root onSelectedChange={(v) => gotoOption(v, 'campus')}>
		<Select.Trigger>
			<Select.Value placeholder="Câmpus" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="">TODOS</Select.Item>
			{#each data.campus as campus}
				<Select.Item value={campus}>{campus.toUpperCase()}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
	<Select.Root onSelectedChange={(v) => gotoOption(v, 'grande_area')}>
		<Select.Trigger>
			<Select.Value placeholder="Grande Área do Conhecimento" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="">TODAS</Select.Item>
			{#each data.grandesAreas as grandeArea}
				<Select.Item value={grandeArea} class="capitalize"
					>{grandeArea.replaceAll('_', ' ').toUpperCase()}</Select.Item
				>
			{/each}
		</Select.Content>
	</Select.Root>
	<Select.Root onSelectedChange={(v) => gotoOption(v, 'area')}>
		<Select.Trigger>
			<Select.Value placeholder="Área do Conhecimento" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="">TODAS</Select.Item>
			{#each data.areas as area}
				<Select.Item value={area} class="capitalize">{area}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
<ProducaoBibliograficaChart data={data.chart} />
