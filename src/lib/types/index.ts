export type ProducoesChartData = {
	ano: string;
	tipo: string;
	total: number;
};

export type FormacaoStatsData =   {
	id: number,
	instituicao: number,
	curso: number,
	ano_inicio: string,
	ano_conclusao: string,
	status: string
	tipo: string
}

export type Researcher = {
	nome_completo: string
}