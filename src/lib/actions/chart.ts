import * as echarts from 'echarts';
export type ChartOptions = echarts.EChartsOption;

export function chart(node: HTMLDivElement, options: ChartOptions) {
	const chart = echarts.init(node);
	chart.setOption(options);

	return {
		destroy() {
			chart.dispose();
		},
		update(newOptions: ChartOptions) {
			chart.setOption(newOptions);
		}
	};
}

export {
	echarts,
}