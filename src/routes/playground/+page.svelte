<script lang="ts">
	import { type ChartOptions, chart} from '$lib/actions/chart';
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import type { Selected } from 'bits-ui';

	let {data} = $props<{
		data: PageData
	}>();

	const TipoProducao = {
		ARTIGO : 'Artigos',
		TRABALHO_EVENTO :  'Trabalhos em Eventos',
		RESUMO :  'Resumos',
		LIVRO :  'Livros',
		CAPITULO_LIVRO :  'Capítulos de Livros',
	}

	const years = Array.from({
		length: new Date().getFullYear() - 2000 + 1
	}).map((_, i) => 2000 + i)

	const groups = $derived(data.chart.reduce((acc, d) => {
		const tipo = TipoProducao[d.tipo_producao as keyof typeof TipoProducao]

		if (!acc[tipo]) {
			acc[tipo] = {}
		}
		acc[tipo][d.ano_producao] = d.count
		return acc
	}, {} as Record<string, {
		[year: string]: number
	}>))

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
		series: []
	})

	$effect(() => {
		options.series = Object.entries(groups).map(([tipo, count]) => ({
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
	})

	function gotoOption(option: Selected<string>){
		const url = new URL(location.href)
		url.searchParams.set('campus', option.value)
		goto(url.toString())
	}
</script>

<section class="relative">
	<div class="pt-24t relative lg:pt-28">
		<form class="mx-auto max-w-7xl px-6 md:px-12">
				<div class="flex items-center gap-4">
					<Select.Root onSelectedChange={(v) => gotoOption(v)}>
						<Select.Trigger>
							<Select.Value  placeholder="Câmpus" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value=''>TODOS</Select.Item>
							{#each data.campus as campus }
								<Select.Item value={campus}>{campus.toUpperCase()}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Button class="uppercase">
						buscar
					</Button>
				</div>
			<div class="h-96 mt-12" use:chart={options}/>
		</form>
	</div>
</section>
