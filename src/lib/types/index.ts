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

export type PaginatedResponse<T> = {
	results: T[];
	total: number;
	per_page: number;
	page: number;
};