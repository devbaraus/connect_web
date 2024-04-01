import type { PageLoad } from './$types';
import { PesquisadoresService } from '$lib/services/pesquisadores-service';

export const load: PageLoad = async ({ params}) => {
	const siape = params.siape as string;

	return {
		producoes: await PesquisadoresService.producoesChart(siape),
		formacao: await PesquisadoresService.formacaoStats(siape),
		pesquisador: await PesquisadoresService.get(siape)
	};
};
