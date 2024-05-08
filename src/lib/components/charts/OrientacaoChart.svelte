<script lang="ts">
	import BaseChart from '$lib/components/charts/BaseChart.svelte';
	import { EnumOrientacao, type OrientacaoStats } from '$lib/types';

	export let data: OrientacaoStats[];
	export let events: Record<string, (params: object) => void> = {};
</script>

<BaseChart key="orientacao" kind="natureza" display="ano" {data} labels={EnumOrientacao} {events} />
