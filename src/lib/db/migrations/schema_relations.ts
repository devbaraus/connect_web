import { relations } from 'drizzle-orm';
import {
	articleAreaAtuacao,
	articleCurriculo,
	articleFormacaoAcademica
} from '$lib/db/migrations/schema';

export const usersRelations = relations(articleCurriculo, ({ many }) => ({
	areaAtuacao: many(articleAreaAtuacao),
	formacaoAcademica: many(articleFormacaoAcademica)
}));

export const areaAtuacaoRelations = relations(articleAreaAtuacao, ({ one }) => ({
	curriculo: one(articleCurriculo, {
		fields: [articleAreaAtuacao.curriculoId],
		references: [articleCurriculo.id]
	})
}));

export const formacaoAcademicaRelations = relations(articleFormacaoAcademica, ({ one }) => ({
	curriculo: one(articleCurriculo, {
		fields: [articleFormacaoAcademica.curriculoId],
		references: [articleCurriculo.id]
	})
}));
