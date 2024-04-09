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
	curriculo: {
		siape: string,
		nome_completo: string,
		numero_lattes: string
	}
	
}

export type FormacaoStatsData =   {
	id: number,
	instituicao: {
		nome: string,
		codigo: string
	},
	curso: {
		nome: string,
		codigo: string
	},
	ano_inicio: string,
	ano_conclusao: string,
	status: string
	tipo: string
}

export const TipoProducaoPlural = {
	ARTIGO: 'Artigos',
	TRABALHO_EVENTO: 'Trabalhos em Eventos',
	RESUMO: 'Resumos',
	LIVRO: 'Livros',
	CAPITULO_LIVRO: 'Capítulos de Livros'
};

export const TipoProducaoSingular = {
	ARTIGO: 'Artigo',
	TRABALHO_EVENTO: 'Trabalho em Evento',
	RESUMO: 'Resumo',
	LIVRO: 'Livro',
	CAPITULO_LIVRO: 'Capítulo de Livro'
};

export type Researcher = {
	nome_completo: string
}

export type PaginatedResponse<T> = {
	results: T[];
	total: number;
	per_page: number;
	page: number;
};