import type { RequestHandler } from './$types';
// import { z } from 'zod';
// import { db } from '$lib/db';
// import { articleCurriculo } from '$lib/db/migrations/schema';
// import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	// try {
	// 	const siape = z.string().parse(url.searchParams.get('siape') as string);
	//
	// 	const rows = await db.query.articleCurriculo.findFirst({
	// 		where: eq(articleCurriculo.siape, siape),
	// 		with: {
	// 			areaAtuacao: true,
	// 			formacaoAcademica: true
	// 		}
	// 	});

		return new Response(JSON.stringify({
			status: 'ok'
		}), {
			headers: {
				'content-type': 'application/json'
			}
		});
	// } catch (e: Error | z.ZodError) {
	// 	if (e instanceof z.ZodError) {
	// 		return error(
	// 			400,
	// 			e.errors.map((err) => `${String(err.path).toUpperCase()} - ${err.message}`).join('\n')
	// 		);
	// 	}
	//
	// 	return error(400, JSON.stringify(e.message));
	// }
};
