<script lang="ts">
	import { chart, type ChartOptions } from '$lib/actions/chart';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { TipoProducaoPlural, type ProducoesChartData, Qualis } from '$lib/types';
	import { transpose } from '$lib/utils';

	export let data: ProducoesChartData[];
	export let kind: 'tipo' | 'qualis' = 'tipo';
	export let displayBy: 'data' | 'categoria' = 'data';
	export let events: Record<string, (params: any) => void> = {};
	export let defaultXAxis: string[] | undefined = undefined;
	export let defaultXRange: [number, number] | undefined = undefined;
	let relative = false;

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

	$: chartXAxis =
		defaultXAxis ??
		Array.from(new Set(Object.values(groups).flatMap(Object.keys))).sort((a, b) => {
			if (displayBy === 'data') {
				return +a - +b;
			}
			return a.localeCompare(b);
		});

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
		const seriesValue = Object.entries(groups)
			.sort(([a], [b]) => groupsOrder.indexOf(a) - groupsOrder.indexOf(b))
			.map(([kind, display]) => chartXAxis.map((value) => display[value] ?? 0));

		const seriesPercentage = transpose(
			transpose(seriesValue).map((values) => {
				const sum = values.reduce((acc, value) => acc + value, 0);
				return values.map((value) => ((value * 100) / sum).toFixed(2));
			})
		);

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
			yAxis: {
				type: 'value',
				name: 'Quantidade de Produções',
				nameLocation: 'middle',
				nameGap: 32,
				max: relative ? 100 : undefined,
				axisLabel: {
					formatter(value) {
						return relative ? `${value.toFixed(0)}%` : `${value}`;
					}
				}
			},
			xAxis: {
				type: 'category',
				data: chartXAxis.map((v) => v.replaceAll('_', ' ').toLocaleUpperCase()),
				nameLocation: 'middle'
			},
			series: Object.entries(groups)
				.sort(([a], [b]) => groupsOrder.indexOf(a) - groupsOrder.indexOf(b))
				.map(([kind, display], index) => ({
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
					data: relative ? seriesPercentage[index] : seriesValue[index]
				}))
		};
	}
</script>

<div class="flex items-center space-x-2">
	<Switch bind:checked={relative} id="mode" />
	<Label for="mode">{relative ? 'Relativo' : 'Real'}</Label>
</div>

<div class="h-[420px] py-12" use:chart={{ options, events }} />
