<script lang="ts">
	import { chart, type ChartOptions } from '$lib/actions/chart';
	import { Qualis, type ProducoesChartData } from '$lib/types';

	export let data: ProducoesChartData[];
	export let events: Record<string, (params: any) => void> = {};
	export let defaultYears: string[] | undefined = undefined;
	export let defaultRange: [number, number] | undefined = undefined;

	const groupsOrder = Object.keys(Qualis);

	$: chartYears = defaultYears ?? Array.from(new Set(data?.map((d) => d.ano)));

	$: chartRange = defaultRange ?? [
		100 - (chartYears.filter((year) => +year >= 2000).length / chartYears.length) * 100,
		100
	];

	$: groups = data?.reduce(
		(acc, d) => {
			const tipo = d.qualis!;

			if (!acc[tipo]) {
				acc[tipo] = {};
			}
			acc[tipo][d.ano] = d.total;
			return acc;
		},
		{} as Record<
			string,
			{
				[year: string]: number;
			}
		>
	)

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
			data: chartYears,
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
					start: chartRange[0],
					end: chartRange[1]
				},
				{
					id: 'dataZoomSlider',
					type: 'slider',
					start: chartRange[0],
					end: chartRange[1]
				}
			],
			xAxis: {
				...options.xAxis,
				data: chartYears
			}
		};
	}

	$: {
		options = {
			...options,
			series: Object.entries(groups)
			.sort(([a], [b]) => groupsOrder.indexOf(a) - groupsOrder.indexOf(b))
			.map(([tipo, count]) => ({
				id: tipo,
				name: Qualis[tipo as never],
				type: 'bar',
				stack: 'total',
				label: {
					show: false
				},
				emphasis: {
					focus: 'series'
				},
				data: chartYears.map((year) => count[year] ?? 0)
			}))
		};
	}
</script>

<div class="h-[420px] py-12" use:chart={{ options, events }} />
