<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { Selected } from 'bits-ui';
	import ProducaoBibliograficaChart from '$lib/components/charts/producao-bibliografica-chart.svelte';

	export let data: PageData;

	$: years = Array.from({
		length: new Date().getFullYear() - 2000 + 1
	}).map((_, i) => 2000 + i);

	function gotoOption(option: Selected<string>) {
		const url = new URL(location.href);
		url.searchParams.set('campus', option.value);
		goto(url.toString());
	}
</script>

<div class="flex items-center gap-4">
	<Select.Root onSelectedChange={(v) => gotoOption(v)}>
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
	<Button class="uppercase">buscar</Button>
</div>
<ProducaoBibliograficaChart data={data.chart} defaultYears={years} />
