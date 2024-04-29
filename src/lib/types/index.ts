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

export type PesquisadorSearch = any;

export type FormacaoGraph =
	components['schemas']['GraphResponse_Union_GraphCurriculo__GraphCurso__'];

export type ProducaoBibliograficaStats =
	components['schemas']['ProducaoBibliograficaStatsResponse'];
export type ProducaoBibliografica = components['schemas']['ProducaoBibliograficaSchema'];
export type ProducaoBibliograficaGraph =
	components['schemas']['GraphResponse_Union_GraphCurriculo__GraphProducaoBibliografica__'];

export type ProducaoTecnica = components['schemas']['ProducaoTecnicaSchema'];
export type ProducaoTecnicaStats = components['schemas']['ProducaoTecnincaStatsResponse'];
export type ProducaoTecnicaGraph =
	components['schemas']['GraphResponse_Union_GraphCurriculo__GraphProducaoTecnica__'];

export type Banca = components['schemas']['BancaSchema'];
export type BancaStats = components['schemas']['BancaStatsResponse'];
export type BancaGraph = components['schemas']['GraphResponse_Union_GraphCurriculo__GraphBanca__'];

export type ProjetoPesquisa = components['schemas']['ProjetoPesquisaSchema'];
export type ProjetoPesquisaStats = components['schemas']['ProjetoPesquisaStatsResponse'];
export type ProjetoPesquisaGraph =
	components['schemas']['GraphResponse_Union_GraphCurriculo__GraphProjetoPesquisa__'];

export type CurriculoNode = components['schemas']['GraphCurriculo'];
export type ProjetoPesquisaNode = components['schemas']['GraphProjetoPesquisa'];
export type ProducaoTecnicaNode = components['schemas']['GraphProducaoTecnica'];
export type ProducaoBibliograficaNode = components['schemas']['GraphProducaoBibliografica'];
export type BancaNode = components['schemas']['GraphBanca'];

export const EnumProjetoPesquisaSituacao = {
	"EM_ANDAMENTO": "Em Andamento",
	"CONCLUIDO": "Concluído",
	"NAO_INFORMADO": "Não Informado"
}

export const EnumQualis = {
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

export const EnumProjetoPesquisa = {
	DESENVOLVIMENTO: 'Desenvolvimento',
	PESQUISA: 'Pesquisa',
	ENSINO: 'Ensino',
	EXTENSAO: 'Extensão',
	OUTRA: 'Outra'
};

export const EnumProducaoTecnica = {
	COMPUTACIONAL: 'Produção Computacional',
	ASSESSORIA: 'Assessoria',
	OUTRA: 'Outra Produção Técnica',
	RELATORIO_TECNICO: 'Relatório Técnico',
	ELABORACAO_DE_PROJETO: 'Elaboração de Projeto',
	PARECER: 'Parecer',
	CONSULTORIA: 'Consultoria',
	SERVICOS_NA_AREA_DA_SAUDE: 'Serviços na Área da Saúde',
	NAO_INFORMADO: 'Não Informado',
	EXTENSAO_TECNOLOGICA: 'Extensão Tecnológica',
	MULTIMIDIA: 'Multimídia'
};

export const EnumFormacaoAcademica = {
	GRADUACAO: 'Graduação',
	ESPECIALIZACAO: 'Especialização',
	MESTRADO: 'Mestrado',
	DOUTORADO: 'Doutorado',
	POS_DOUTORADO: 'Pós-Doutorado'
};

export const EnumProducaoBibliografica = {
	ARTIGO: 'Artigo Periódico',
	TRABALHO_EVENTO: 'Trabalho em Evento',
	RESUMO: 'Resumo',
	LIVRO: 'Livro',
	CAPITULO_LIVRO: 'Capítulo de Livro'
};
