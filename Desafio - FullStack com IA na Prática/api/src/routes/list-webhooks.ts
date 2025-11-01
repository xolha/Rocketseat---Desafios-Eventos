import {FastifyPluginAsyncZod} from "fastify-type-provider-zod";
import {z} from "zod";
import {webhooks} from "@/db/schema";
import {createSelectSchema} from "drizzle-zod";
import {db} from "@/db";
import {desc, lt} from "drizzle-orm";

//webhooks é o nome do banco de dados!!

export const listWebhooks: FastifyPluginAsyncZod = async (App) => {
    App.get(
        '/api/webhooks',
        {
            schema: {
                // validação e documentação das rotas
                summary: "List webhooks",
                tags: ["Webhooks"],
                querystring: z.object({
                    //parâmetro de busca
                    limit: z.coerce.number().min(1).max(100).default(20), //limite de itens/resultados a se trazer
                    cursor: z.string().optional(),
                }),
                response: {
                    200: z.object({
                        webhooks: z.array(
                            createSelectSchema(webhooks).pick({
                                id: true,
                                method: true,
                                pathname: true,
                                createdAt: true,
                            })
                        ),
                        nextCursor: z.string().nullable(),
                    })
                }
            },
        },

        async (request, reply) => {
            const {limit, cursor} = request.query;

            let query = db
                .select({
                    id: webhooks.id,
                    method: webhooks.method,
                    pathname: webhooks.pathname,
                    createdAt: webhooks.createdAt,
                })
                .from(webhooks)
                .$dynamic()
            
            if (cursor) {
                query = query.where(lt(webhooks.id, cursor))
            }

            const result = await query
                .orderBy(desc(webhooks.id))
                .limit(limit + 1)

            const hasMore = result.length > limit
            const items = hasMore ? result.slice(0, limit) : result
            const nextCursor = hasMore ? items[items.length - 1].id : null

            return reply.send ({
                webhooks: items,
                nextCursor,
            })
        },
    )
}