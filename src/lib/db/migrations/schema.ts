import {
	pgTable,
	index,
	bigint,
	varchar,
	text,
	date,
	boolean,
	timestamp,
	doublePrecision
} from 'drizzle-orm/pg-core';

export const articleAtuacaoProfissional = pgTable(
	'article_atuacao_profissional',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nomeDaInstituicao: varchar('nome_da_instituicao', { length: 300 }),
		anoTrabalho: varchar('ano_trabalho', { length: 60 }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoId69A77C50: index('article_atuacao_profissional_curriculo_id_69a77c50').on(
				table.curriculoId
			)
		};
	}
);

export const articleCurriculo = pgTable(
	'article_curriculo',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		siape: varchar('siape', { length: 300 }),
		nomeCompleto: varchar('nome_completo', { length: 300 }).notNull(),
		nomeCompletoSemAcento: varchar('nome_completo_sem_acento', { length: 300 }),
		linkCurriculo: varchar('link_curriculo', { length: 300 }),
		nomeCitacoesBibliograficas: text('nome_citacoes_bibliograficas').notNull(),
		ufNascimento: varchar('uf_nascimento', { length: 300 }),
		dataIngressoIfg: date('data_ingresso_ifg'),
		cidadeNascimento: varchar('cidade_nascimento', { length: 300 }),
		resumoCv: text('resumo_cv'),
		palavraChave: text('palavra_chave'),
		campusAtual: text('campus_atual'),
		categoria: text('categoria'),
		aceitandoEmail: boolean('aceitando_email').notNull(),
		email: varchar('email', { length: 300 }),
		dataAtualizacaoLattes: timestamp('data_atualizacao_lattes', {
			withTimezone: true,
			mode: 'string'
		}),
		dataNascimento: varchar('data_nascimento', { length: 30 }),
		dataCriacao: timestamp('data_criacao', { withTimezone: true, mode: 'string' }),
		saiuDoIfg: boolean('saiu_do_ifg').notNull()
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
	},
	(table) => {
		return {
			siape7788E81ALike: index('article_curriculo_siape_7788e81a_like').on(table.siape)
		};
	}
);

export const articleAluno = pgTable(
	'article_aluno',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nomeAluno: varchar('nome_aluno', { length: 300 }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		gruposDePesquisaId: bigint('grupos_de_pesquisa_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			gruposDePesquisaIdA3633B0D: index('article_aluno_grupos_de_pesquisa_id_a3633b0d').on(
				table.gruposDePesquisaId
			)
		};
	}
);

export const articleAreaAtuacao = pgTable(
	'article_area_atuacao',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		grandeAreaConhecimento: text('grande_area_conhecimento'),
		especialidade: text('especialidade'),
		areaDoConheciento: text('area_do_conheciento'),
		subAreaDoConhecimento: text('sub_area_do_conhecimento'),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoId: index('article_area_atuacao_curriculo_id_05f0a164').on(table.curriculoId)
		};
	}
);

export const articleAtividade = pgTable(
	'article_atividade',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		dataInicio: varchar('data_inicio', { length: 12 }).notNull(),
		atividade: text('atividade').notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		atuacaoProfissionalId: bigint('atuacao_profissional_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			atuacaoProfissionalId47Fcf16C: index('article_atividade_atuacao_profissional_id_47fcf16c').on(
				table.atuacaoProfissionalId
			)
		};
	}
);

export const articleBanca = pgTable(
	'article_banca',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		titulo: text('titulo').notNull(),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		ano: varchar('ano', { length: 64 }),
		natureza: varchar('natureza', { length: 64 }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoIdDa0A4C97: index('article_banca_curriculo_id_da0a4c97').on(table.curriculoId)
		};
	}
);

export const articleConferencia = pgTable('article_conferencia', {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint('id', { mode: 'number' }).notNull(),
	tituloConferencia: text('titulo_conferencia').notNull(),
	sigla: varchar('sigla', { length: 20 }),
	qualis: varchar('qualis', { length: 6 })
});

export const articleCurriculoLinhaGrupo = pgTable(
	'article_curriculo_linha_grupo',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		lider: boolean('lider').notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		gruposId: bigint('grupos_id', { mode: 'number' }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		linhasId: bigint('linhas_id', { mode: 'number' })
	},
	(table) => {
		return {
			curriculoId256Ccda5: index('article_curriculo_linha_grupo_curriculo_id_256ccda5').on(
				table.curriculoId
			),
			gruposId32A4B54B: index('article_curriculo_linha_grupo_grupos_id_32a4b54b').on(
				table.gruposId
			),
			linhasIdAf73E3F6: index('article_curriculo_linha_grupo_linhas_id_af73e3f6').on(table.linhasId)
		};
	}
);

export const articleFormacaoAcademica = pgTable(
	'article_formacao_academica',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nomeInstituicao: varchar('nome_instituicao', { length: 300 }).notNull(),
		nomeCurso: varchar('nome_curso', { length: 300 }),
		anoInicio: varchar('ano_inicio', { length: 64 }).notNull(),
		anoConclusao: varchar('ano_conclusao', { length: 64 }),
		statusCurso: varchar('status_curso', { length: 300 }).notNull(),
		tipoFormacao: varchar('tipo_formacao', { length: 100 }).notNull(),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoIdEd4641F5: index('article_formacao_academica_curriculo_id_ed4641f5').on(
				table.curriculoId
			)
		};
	}
);

export const articleGrupoPesquisa = pgTable('article_grupo_pesquisa', {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint('id', { mode: 'number' }).notNull(),
	nomeGrupo: text('nome_grupo'),
	situacaoDoGrupo: varchar('situacao_do_grupo', { length: 64 }),
	situacaoDoGrupoPorCriterios: varchar('situacao_do_grupo_por_criterios', { length: 64 }).notNull(),
	anoFormacao: varchar('ano_formacao', { length: 4 }),
	liderDoGrupo: varchar('lider_do_grupo', { length: 300 }),
	campus: varchar('campus', { length: 300 }),
	linkDoGrupo: text('link_do_grupo'),
	linhaDePesquisa: text('linha_de_pesquisa')
});

export const articleLinhaPesquisa = pgTable('article_linha_pesquisa', {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint('id', { mode: 'number' }).notNull(),
	nomeDaLinha: text('nome_da_linha')
});

export const articleNotaRecomendacao = pgTable(
	'article_nota_recomendacao',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nota: doublePrecision('nota'),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		producaoId: bigint('producao_id', { mode: 'number' }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		projetoPesquisaId: bigint('projeto_pesquisa_id', { mode: 'number' })
	},
	(table) => {
		return {
			curriculoId287C0175: index('article_nota_recomendacao_curriculo_id_287c0175').on(
				table.curriculoId
			),
			producaoId2A05Ca62: index('article_nota_recomendacao_producao_id_2a05ca62').on(
				table.producaoId
			),
			projetoPesquisaId07933534: index('article_nota_recomendacao_projeto_pesquisa_id_07933534').on(
				table.projetoPesquisaId
			)
		};
	}
);

export const articleOrientacao = pgTable(
	'article_orientacao',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		tipoOrientacao: varchar('tipo_orientacao', { length: 100 }).notNull(),
		tituloOrientacao: text('titulo_orientacao').notNull(),
		anoOrientacao: varchar('ano_orientacao', { length: 12 }).notNull(),
		nomeOrientado: varchar('nome_orientado', { length: 100 }),
		concluida: boolean('concluida').notNull(),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoId13C895D7: index('article_orientacao_curriculo_id_13c895d7').on(table.curriculoId)
		};
	}
);

export const articleOutraProducao = pgTable(
	'article_outra_producao',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nomeProducao: text('nome_producao').notNull(),
		anoProducao: varchar('ano_producao', { length: 64 }),
		natureza: text('natureza'),
		tipo: varchar('tipo', { length: 100 }),
		meioDeDivulgacao: varchar('meio_de_divulgacao', { length: 100 }),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoId6Edf5F39: index('article_outra_producao_curriculo_id_6edf5f39').on(
				table.curriculoId
			)
		};
	}
);

export const articleProducaoBibliografica = pgTable(
	'article_producao_bibliografica',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		doiProducao: varchar('doi_producao', { length: 300 }),
		natureza: varchar('natureza', { length: 300 }).notNull(),
		anoProducao: varchar('ano_producao', { length: 300 }),
		idioma: varchar('idioma', { length: 300 }),
		tipo: varchar('tipo', { length: 100 }),
		tituloProducao: text('titulo_producao').notNull(),
		classificacaoDoEvento: varchar('classificacao_do_evento', { length: 100 }),
		meioDivulgacao: varchar('meio_divulgacao', { length: 300 }),
		tipoProducao: varchar('tipo_producao', { length: 300 }),
		nomePdf: varchar('nome_pdf', { length: 10 }),
		pdfValido: boolean('pdf_valido').notNull(),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		conferenciaId: bigint('conferencia_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		revistaId: bigint('revista_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			conferenciaId103166A0: index('article_producao_bibliografica_conferencia_id_103166a0').on(
				table.conferenciaId
			),
			curriculoIdCf33Add9: index('article_producao_bibliografica_curriculo_id_cf33add9').on(
				table.curriculoId
			),
			revistaIdAf2Da629: index('article_producao_bibliografica_revista_id_af2da629').on(
				table.revistaId
			)
		};
	}
);

export const articleProducaoEvento = pgTable(
	'article_producao_evento',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		titulo: text('titulo').notNull(),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		ano: varchar('ano', { length: 64 }),
		natureza: varchar('natureza', { length: 64 }),
		tipoParticipacao: varchar('tipo_participacao', { length: 64 }),
		formaParticipacao: varchar('forma_participacao', { length: 64 }),
		divulgacaoCientifica: varchar('divulgacao_cientifica', { length: 1 }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoId87177Eab: index('article_producao_evento_curriculo_id_87177eab').on(
				table.curriculoId
			)
		};
	}
);

export const articleProducaoTecnica = pgTable(
	'article_producao_tecnica',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nomeProducao: text('nome_producao').notNull(),
		anoProducaoTecnica: varchar('ano_producao_tecnica', { length: 12 }).notNull(),
		natureza: varchar('natureza', { length: 300 }),
		ano: varchar('ano', { length: 12 }),
		finalidade: text('finalidade'),
		descricao: text('descricao'),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoId04E33019: index('article_producao_tecnica_curriculo_id_04e33019').on(
				table.curriculoId
			)
		};
	}
);

export const articleProjetoPesquisa = pgTable(
	'article_projeto_pesquisa',
	{
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		id: bigint('id', { mode: 'number' }).notNull(),
		nomeProjeto: text('nome_projeto').notNull(),
		descricaoProjeto: text('descricao_projeto'),
		dataInicio: varchar('data_inicio', { length: 12 }),
		dataTermino: varchar('data_termino', { length: 12 }),
		financiadorProjeto: text('financiador_projeto'),
		instituicaoFinanciadora: text('instituicao_financiadora'),
		orgaoDoProjeto: text('orgao_do_projeto'),
		// TODO: failed to parse database type 'vector(384)'
		// embedding: unknown("embedding"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		curriculoId: bigint('curriculo_id', { mode: 'number' }).notNull()
	},
	(table) => {
		return {
			curriculoIdE0Afe8B2: index('article_projeto_pesquisa_curriculo_id_e0afe8b2').on(
				table.curriculoId
			)
		};
	}
);
