import type { PageLoad } from './$types';
import { PesquisadoresService } from '$lib/services/pesquisadores-service';

export const load: PageLoad = async ({ params}) => {
	const siape = params.siape as string;

	return {
		producoes: await PesquisadoresService.producoesChart(siape),
		formacoes: PesquisadoresService.formacoes(siape),
		pesquisador: PesquisadoresService.get(siape),
		areasConhecimento: PesquisadoresService.areasConhecimento(siape)
	};
};
