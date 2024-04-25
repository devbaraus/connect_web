<script lang="ts">
	import { chart, type ChartOptions } from '$lib/actions/chart';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { transpose } from '$lib/utils';

	let relative = false;

	export let key: string;
	export let data: any[];
	export let labels: object;
	export let kind: string;
	export let display: string;
	export let events: Record<string, (params: object) => void> = {};
	export let defaultXAxis: string[] | undefined = undefined;
	export let options: ChartOptions = {};

	let labelOrder = Object.keys(labels);

	let groups = data.reduce(
		(acc, d) => {
			if (!acc[d[kind]]) {
				acc[d[kind]] = {};
			}
			acc[d[kind]][d[display]] = d.total;
			return acc;
		},
		{} as Record<string, Record<string, number>>
	);

	let chartXAxis =
		defaultXAxis ??
		Array.from(new Set(Object.values(groups).flatMap(Object.keys))).sort((a, b) => {
			if (isNaN(+a) && isNaN(+b)) return a.localeCompare(b);
			return +a - +b;
		});

	let chartOptions: ChartOptions = {
		...options,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
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
			...options.yAxis,
			type: 'value',
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
			...options.xAxis,
			type: 'category',
			data: chartXAxis,
			nameLocation: 'middle'
		},
		series: []
	};

	$: {
		const seriesValue = Object.entries(groups)
			.sort(([a], [b]) => labelOrder.indexOf(a) - labelOrder.indexOf(b))
			.map(([, d]) => chartXAxis.map((value) => d[value] ?? 0));

		const seriesPercentage = transpose(
			transpose(seriesValue).map((values) => {
				const sum = values.reduce((acc, value) => acc + value, 0);
				return values.map((value) => ((value * 100) / sum).toFixed(2));
			})
		);

		chartOptions = {
			...chartOptions,
			yAxis: {
				...chartOptions.yAxis,
				max: relative ? 100 : undefined,
				axisLabel: {
					formatter(value) {
						return relative ? `${value.toFixed(0)}%` : `${value}`;
					}
				}
			},
			series: Object.entries(groups)
				.sort(([a], [b]) => labelOrder.indexOf(a) - labelOrder.indexOf(b))
				.map(([kind], index) => ({
					id: kind,
					name: labels[kind as never],
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

{#if data.length === 0}
	<p class="flex h-full w-full items-center justify-center text-center">Nenhum dado encontrado.</p>
{:else}
	<div class="flex items-center space-x-2">
		<Switch bind:checked={relative} id={`${key}-chart-mode`} />
		<Label for={`${key}-chart-mode`}>{relative ? 'Relativo' : 'Real'}</Label>
	</div>
	<div class="h-[420px] py-12" use:chart={{ options: chartOptions, events }} />
{/if}
