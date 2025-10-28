import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

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
                }),
                response: {
                    200: z.array(
                        z.object({
                            id: z.string(),
                            method: z.string(),
                        })
                    )
                }
            },
        },
        async (request, reply) => {
            const { limit } = request.query;

            return [
                {
                    id: "Julia",
                    method: "POST",
                }
            ]
        },
    )
}