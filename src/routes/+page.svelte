<script lang="ts">
	import ProducaoBibliograficaChart from '$lib/components/charts/ProducaoBibliograficaChart.svelte';
	import ProducoesFilters from '$lib/components/filters/ProducoesFilters.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="space-y-4">
	<ProducoesFilters campuses={data.campus} grandesAreas={data.grandesAreas} areas={data.areas} />
</div>
<ProducaoBibliograficaChart data={data.chart} />
