import * as echarts from 'echarts';
export type ChartOptions = echarts.EChartsOption;
export type ChartEvents = echarts.ECElementEvent

export type ChartParams = {
	options: ChartOptions,
	events?: {
		[event: string]: (params: any) => void
	}
}

export function chart(node: HTMLDivElement, params: ChartParams) {
	const chart = echarts.init(node);
	chart.setOption(params.options);			


	if(params.events) {
		Object.entries(params.events).map(([event, fn]) => chart.on(event, fn))
	}

	return {
		destroy() {
			chart.dispose();
		},
		update(newParams: ChartParams) {
			chart.setOption(newParams.options);
		}
	};
}

export {
	echarts,
}