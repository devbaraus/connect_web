<script lang="ts">
	import { chart, type ChartOptions } from '$lib/actions/chart';
	import { TipoProducaoPlural, type ProducoesChartData, Qualis } from '$lib/types';

	export let data: ProducoesChartData[];
	export let kind: 'tipo' | 'qualis' = 'tipo';
	export let displayBy: 'data' | 'categoria' = 'data';
	export let events: Record<string, (params: any) => void> = {};
	export let defaultXAxis: string[] | undefined = undefined;
	export let defaultXRange: [number, number] | undefined = undefined;

	const groupsObj = kind === 'tipo' ? TipoProducaoPlural : Qualis;
	const groupsOrder = Object.keys(groupsObj);

	$: groups = data?.reduce(
		(acc, d) => {
			const kindKey = kind === 'tipo' ? d.tipo! : d.qualis!;
			const displayKey = displayBy === 'data' ? d.ano! : d.grande_area!;

			if (!acc[kindKey]) {
				acc[kindKey] = {};
			}
			acc[kindKey][displayKey] = d.total;
			return acc;
		},
		{} as Record<
			string,
			{
				[year: string]: number;
			}
		>
	);

	$: chartXAxis = defaultXAxis ?? Array.from(new Set(Object.values(groups).flatMap(Object.keys)));

	$: chartXRange =
		defaultXRange ?? displayBy == 'data'
			? [100 - (chartXAxis.filter((year) => +year >= 2000).length / chartXAxis.length) * 100, 100]
			: [0, 100];

	let options: ChartOptions = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				// Use axis to trigger tooltip
				type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
			}
		},
		legend: {},
		dataZoom: [
			{
				id: 'dataZoomInside',
				type: 'inside',
				start: 0,
				end: 100
			},
			{
				id: 'dataZoomSlider',
				type: 'slider',
				start: 0,
				end: 100
			}
		],
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		yAxis: {
			type: 'value',
			name: 'Quantidade de Produções',
			nameLocation: 'middle',
			nameGap: 32
		},
		xAxis: {
			type: 'category',
			data: chartXAxis,
			nameLocation: 'middle'
		},
		series: []
	};

	$: {
		options = {
			...options,
			dataZoom: [
				{
					id: 'dataZoomInside',
					type: 'inside',
					start: chartXRange[0],
					end: chartXRange[1]
				},
				{
					id: 'dataZoomSlider',
					type: 'slider',
					start: chartXRange[0],
					end: chartXRange[1]
				}
			],
			xAxis: {
				type: 'category',
				data: chartXAxis,
				nameLocation: 'middle'
			},
			series: Object.entries(groups)
				.sort(([a], [b]) => groupsOrder.indexOf(a) - groupsOrder.indexOf(b))
				.map(([kind, display]) => ({
					id: kind,
					name: groupsObj[kind as never],
					type: 'bar',
					stack: 'total',
					label: {
						show: false
					},
					emphasis: {
						focus: 'series'
					},
					data: chartXAxis.map((value) => display[value] ?? 0)
				}))
		};
	}
</script>

<div class="h-[420px] py-12" use:chart={{ options, events }} />
