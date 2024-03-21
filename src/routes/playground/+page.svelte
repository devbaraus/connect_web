<script lang="ts">
	import { type ChartOptions, chart} from '$lib/actions/chart';
	import type { PageData } from './$types';

	let {data} = $props<{
		data: PageData
	}>();

	const years = data.chart.map(d => d.ano_producao)
	const groups = data.chart.reduce((acc, d) => {
		if (!acc[d.tipo_producao]) {
			acc[d.tipo_producao] = []
		}
		acc[d.tipo_producao].push(d.count)
		return acc
	}, {})

	let options: ChartOptions = $state({
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				// Use axis to trigger tooltip
				type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
			}
		},
		legend: {},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		yAxis: {
			type: 'value'
		},
		xAxis: {
			type: 'category',
			data: years
		},
		series: [
			...Object.entries(groups).map(([tipo, count]) => ({
				name: tipo,
				type: 'bar',
				stack: 'total',
				label: {
					show: true
				},
				emphasis: {
					focus: 'series'
				},
				data:count
			})),
		]
	})

	// function updateSeries() {
	// 	options.series[0].data = Array.from({length: 7}, () => Math.floor(Math.random() * 300))
	// }
</script>

<section class="relative">
	<div class="pt-24t relative lg:pt-28">
		<div class="mx-auto max-w-7xl px-6 md:px-12">
			<div class="h-96" use:chart={options}/>
<!--			<button class="mt-4 text-white" onclick={updateSeries}>Update Series</button>-->
		</div>
	</div>
</section>
