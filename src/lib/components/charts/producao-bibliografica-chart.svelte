<script lang="ts">
	import { type ChartOptions, chart } from '$lib/actions/chart';
	import type { ProducoesChartData } from '$lib/types';

	export let data: ProducoesChartData[];
	export let defaultYears: number[] | undefined = undefined;

	const TipoProducao = {
		ARTIGO: 'Artigos',
		TRABALHO_EVENTO: 'Trabalhos em Eventos',
		RESUMO: 'Resumos',
		LIVRO: 'Livros',
		CAPITULO_LIVRO: 'Capítulos de Livros'
	};

	$: years = defaultYears ?? Array.from(new Set(data?.map((d) => d.ano)));

	$: percentYearsGTE2000 = 100 - (years.filter((year) => +year >= 2000).length / years.length * 100)

	$: groups = data?.reduce(
		(acc, d) => {
			const tipo = TipoProducao[d.tipo as keyof typeof TipoProducao];

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
	);

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
			data: years,
			nameLocation: 'middle',
		},
		series: []
	};

	$: {
		options = {
			...options,
			dataZoom: [
				{
					start: percentYearsGTE2000,
					end: 100,
					xAxisIndex: 0
				}
			],
			xAxis: {
				...options.xAxis,
				data: years
			}
		};
	}

	$: {
		options = {
			...options,
			series: Object.entries(groups).map(([tipo, count]) => ({
				name: tipo,
				type: 'bar',
				stack: 'total',
				label: {
					show: false
				},
				emphasis: {
					focus: 'series'
				},
				data: years.map((year) => count[year] ?? 0)
			}))
		};
	}
</script>

<div class="h-[420px] py-12" use:chart={options} />
