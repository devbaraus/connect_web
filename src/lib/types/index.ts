export type ProducoesChartData = {
	ano: string;
	tipo: string;
	total: number;
};

export type FormacaoStatsData =   {
	id: number,
	nome_instituicao: string,
	nome_curso: string,
	ano_inicio: string,
	ano_conclusao: string,
	status_curso: string
	tipo_formacao: string
}

export type Researcher = {
	nome_completo: string
}