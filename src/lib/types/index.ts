export type ProducoesChartData = {
	ano: string;
	tipo?: string;
	qualis?: string;
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

export const Qualis = {
	"A1": "A1",
	"A2": "A2",
	"B1": "B1",
	"B2": "B2",
	"B3": "B3",
	"B4": "B4",
	"B5": "B5",
	null: "Não classificado"
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