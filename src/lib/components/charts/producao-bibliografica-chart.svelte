<script lang="ts">
	import { type ChartOptions, chart} from '$lib/actions/chart';
	import type { ChartData } from '$lib/services/chart-service';

	export let data: ChartData[]
	export let defaultYears: number[] | undefined = undefined

	const TipoProducao = {
		ARTIGO : 'Artigos',
		TRABALHO_EVENTO :  'Trabalhos em Eventos',
		RESUMO :  'Resumos',
		LIVRO :  'Livros',
		CAPITULO_LIVRO :  'Capítulos de Livros',
	}

	$: years = defaultYears ?? Array.from(new Set(data?.map(d => d.ano_producao)))

	$: groups = data?.reduce((acc, d) => {
		const tipo = TipoProducao[d.tipo_producao as keyof typeof TipoProducao]

		if (!acc[tipo]) {
			acc[tipo] = {}
		}
		acc[tipo][d.ano_producao] = d.count
		return acc
	}, {} as Record<string, {
		[year: string]: number
	}>)

	let options: ChartOptions = {
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
			type: 'value',
			name: 'Quantidade de Produções',
			nameLocation: 'middle',
			nameGap: 32
		},
		xAxis: {
			type: 'category',
			data: years,
			nameLocation: 'middle',
			name: 'Ano de Produção',
			nameGap: 32
		},
		series: []
	}

	$: {
		options = {
			...options,
			xAxis: {
				...options.xAxis,
				data: years
			},
		}
	}

	$: {
		options  = {
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
				data: years.map(year => count[year] ?? 0)
			}))
		}
	}
</script>

<div class="h-[420px] py-12" use:chart={options}/>
