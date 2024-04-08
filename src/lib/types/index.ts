export type ProducoesChartData = {
	ano: string;
	tipo: string;
	total: number;
};

export type ProducoesData = {
	id : number,
	doi: string,
	natureza: string,
	ano: string,
	idioma: string,
	tipo: string,
	tipo_livro: string,
	titulo: string,
	classificacao: string,
	meio_divulgacao: string,
	
}

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

export type PaginatedResponse<T> = {
	results: T[];
	total: number;
	per_page: number;
	page: number;
};