import type { components } from './api';

export type GrandeArea = string;
export type Area = string;
export type Campus = string;

export type PaginatedResponse<T> = {
	results: T[];
	total: number;
	per_page: number;
	page: number;
};

export type PesquisadorSearch = components['schemas']['MeiliResponse'];
export type ProducoesBibliograficasStats =
	components['schemas']['ProducaoBibliograficaStatsResponse'];
export type ProducoesBibliograficas = components['schemas']['ProducaoBibliograficaSchema'];

export const Qualis = {
	null: 'NC',
	A1: 'A1',
	A2: 'A2',
	B1: 'B1',
	B2: 'B2',
	B3: 'B3',
	B4: 'B4',
	B5: 'B5',
	C: 'C'
};

export const EnumFormacaoAcademica = {
	GRADUACAO: 'Graduação',
	ESPECIALIZACAO: 'Especialização',
	MESTRADO: 'Mestrado',
	DOUTORADO: 'Doutorado',
	POS_DOUTORADO: 'Pós-Doutorado'
};

export const EnumProducaoBibliograficaPlural = {
	ARTIGO: 'Artigos',
	TRABALHO_EVENTO: 'Trabalhos em Eventos',
	RESUMO: 'Resumos',
	LIVRO: 'Livros',
	CAPITULO_LIVRO: 'Capítulos de Livros'
};

export const EnumProducaoBibliograficaSingular = {
	ARTIGO: 'Artigo',
	TRABALHO_EVENTO: 'Trabalho em Evento',
	RESUMO: 'Resumo',
	LIVRO: 'Livro',
	CAPITULO_LIVRO: 'Capítulo de Livro'
};


