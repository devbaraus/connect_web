-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "article_atuacao_profissional" (
	"id" bigint NOT NULL,
	"nome_da_instituicao" varchar(300),
	"ano_trabalho" varchar(60),
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_curriculo" (
	"id" bigint NOT NULL,
	"siape" varchar(300),
	"nome_completo" varchar(300) NOT NULL,
	"nome_completo_sem_acento" varchar(300),
	"link_curriculo" varchar(300),
	"nome_citacoes_bibliograficas" text NOT NULL,
	"uf_nascimento" varchar(300),
	"data_ingresso_ifg" date,
	"cidade_nascimento" varchar(300),
	"resumo_cv" text,
	"palavra_chave" text,
	"campus_atual" text,
	"categoria" text,
	"aceitando_email" boolean NOT NULL,
	"email" varchar(300),
	"data_atualizacao_lattes" timestamp with time zone,
	"data_nascimento" varchar(30),
	"data_criacao" timestamp with time zone,
	"saiu_do_ifg" boolean NOT NULL,
	"embedding" "vector(384)"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_aluno" (
	"id" bigint NOT NULL,
	"nome_aluno" varchar(300),
	"grupos_de_pesquisa_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_area_atuacao" (
	"id" bigint NOT NULL,
	"grande_area_conhecimento" text,
	"especialidade" text,
	"area_do_conheciento" text,
	"sub_area_do_conhecimento" text,
	"embedding" "vector(384)",
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_atividade" (
	"id" bigint NOT NULL,
	"data_inicio" varchar(12) NOT NULL,
	"atividade" text NOT NULL,
	"atuacao_profissional_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_banca" (
	"id" bigint NOT NULL,
	"titulo" text NOT NULL,
	"embedding" "vector(384)",
	"ano" varchar(64),
	"natureza" varchar(64),
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_conferencia" (
	"id" bigint NOT NULL,
	"titulo_conferencia" text NOT NULL,
	"sigla" varchar(20),
	"qualis" varchar(6)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_curriculo_linha_grupo" (
	"id" bigint NOT NULL,
	"lider" boolean NOT NULL,
	"curriculo_id" bigint,
	"grupos_id" bigint,
	"linhas_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_formacao_academica" (
	"id" bigint NOT NULL,
	"nome_instituicao" varchar(300) NOT NULL,
	"nome_curso" varchar(300),
	"ano_inicio" varchar(64) NOT NULL,
	"ano_conclusao" varchar(64),
	"status_curso" varchar(300) NOT NULL,
	"tipo_formacao" varchar(100) NOT NULL,
	"embedding" "vector(384)",
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_grupo_pesquisa" (
	"id" bigint NOT NULL,
	"nome_grupo" text,
	"situacao_do_grupo" varchar(64),
	"situacao_do_grupo_por_criterios" varchar(64) NOT NULL,
	"ano_formacao" varchar(4),
	"lider_do_grupo" varchar(300),
	"campus" varchar(300),
	"link_do_grupo" text,
	"linha_de_pesquisa" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_linha_pesquisa" (
	"id" bigint NOT NULL,
	"nome_da_linha" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_nota_recomendacao" (
	"id" bigint NOT NULL,
	"nota" double precision,
	"curriculo_id" bigint NOT NULL,
	"producao_id" bigint,
	"projeto_pesquisa_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_orientacao" (
	"id" bigint NOT NULL,
	"tipo_orientacao" varchar(100) NOT NULL,
	"titulo_orientacao" text NOT NULL,
	"ano_orientacao" varchar(12) NOT NULL,
	"nome_orientado" varchar(100),
	"concluida" boolean NOT NULL,
	"embedding" "vector(384)",
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_outra_producao" (
	"id" bigint NOT NULL,
	"nome_producao" text NOT NULL,
	"ano_producao" varchar(64),
	"natureza" text,
	"tipo" varchar(100),
	"meio_de_divulgacao" varchar(100),
	"embedding" "vector(384)",
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_producao_bibliografica" (
	"id" bigint NOT NULL,
	"doi_producao" varchar(300),
	"natureza" varchar(300) NOT NULL,
	"ano_producao" varchar(300),
	"idioma" varchar(300),
	"tipo" varchar(100),
	"titulo_producao" text NOT NULL,
	"classificacao_do_evento" varchar(100),
	"meio_divulgacao" varchar(300),
	"tipo_producao" varchar(300),
	"nome_pdf" varchar(10),
	"pdf_valido" boolean NOT NULL,
	"embedding" "vector(384)",
	"conferencia_id" bigint NOT NULL,
	"curriculo_id" bigint NOT NULL,
	"revista_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_producao_evento" (
	"id" bigint NOT NULL,
	"titulo" text NOT NULL,
	"embedding" "vector(384)",
	"ano" varchar(64),
	"natureza" varchar(64),
	"tipo_participacao" varchar(64),
	"forma_participacao" varchar(64),
	"divulgacao_cientifica" varchar(1),
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_producao_tecnica" (
	"id" bigint NOT NULL,
	"nome_producao" text NOT NULL,
	"ano_producao_tecnica" varchar(12) NOT NULL,
	"natureza" varchar(300),
	"ano" varchar(12),
	"finalidade" text,
	"descricao" text,
	"embedding" "vector(384)",
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "article_projeto_pesquisa" (
	"id" bigint NOT NULL,
	"nome_projeto" text NOT NULL,
	"descricao_projeto" text,
	"data_inicio" varchar(12),
	"data_termino" varchar(12),
	"financiador_projeto" text,
	"instituicao_financiadora" text,
	"orgao_do_projeto" text,
	"embedding" "vector(384)",
	"curriculo_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_atuacao_profissional_curriculo_id_69a77c50" ON "article_atuacao_profissional" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_curriculo_siape_7788e81a_like" ON "article_curriculo" ("siape");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_aluno_grupos_de_pesquisa_id_a3633b0d" ON "article_aluno" ("grupos_de_pesquisa_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_area_atuacao_curriculo_id_05f0a164" ON "article_area_atuacao" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_atividade_atuacao_profissional_id_47fcf16c" ON "article_atividade" ("atuacao_profissional_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_banca_curriculo_id_da0a4c97" ON "article_banca" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_curriculo_linha_grupo_curriculo_id_256ccda5" ON "article_curriculo_linha_grupo" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_curriculo_linha_grupo_grupos_id_32a4b54b" ON "article_curriculo_linha_grupo" ("grupos_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_curriculo_linha_grupo_linhas_id_af73e3f6" ON "article_curriculo_linha_grupo" ("linhas_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_formacao_academica_curriculo_id_ed4641f5" ON "article_formacao_academica" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_nota_recomendacao_curriculo_id_287c0175" ON "article_nota_recomendacao" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_nota_recomendacao_producao_id_2a05ca62" ON "article_nota_recomendacao" ("producao_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_nota_recomendacao_projeto_pesquisa_id_07933534" ON "article_nota_recomendacao" ("projeto_pesquisa_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_orientacao_curriculo_id_13c895d7" ON "article_orientacao" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_outra_producao_curriculo_id_6edf5f39" ON "article_outra_producao" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_producao_bibliografica_conferencia_id_103166a0" ON "article_producao_bibliografica" ("conferencia_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_producao_bibliografica_curriculo_id_cf33add9" ON "article_producao_bibliografica" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_producao_bibliografica_revista_id_af2da629" ON "article_producao_bibliografica" ("revista_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_producao_evento_curriculo_id_87177eab" ON "article_producao_evento" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_producao_tecnica_curriculo_id_04e33019" ON "article_producao_tecnica" ("curriculo_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_projeto_pesquisa_curriculo_id_e0afe8b2" ON "article_projeto_pesquisa" ("curriculo_id");
*/