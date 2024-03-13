<script lang="ts">
	import * as echarts from 'echarts';
	type EChartsOption = echarts.EChartsOption;

	let { options } = $props<{
		options: EChartsOption
	}>()

	function chart(node: HTMLDivElement, options: EChartsOption) {
		const chart = echarts.init(node);
		chart.setOption(options);

		return {
			destroy() {
				chart.dispose();
			},
			update(newOptions: EChartsOption) {
				chart.setOption(newOptions);
			}
		};
	}

</script>

<div class="h-96" use:chart={options}></div>
