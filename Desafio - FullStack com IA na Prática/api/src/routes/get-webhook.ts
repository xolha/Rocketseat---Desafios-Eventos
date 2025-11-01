import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import  { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {webhooks} from "@/db/schema";
import {db} from "@/db";
import {eq} from "drizzle-orm";

export const getWebhook: FastifyPluginAsyncZod = async (App) => {
    App.get(
        '/api/webhooks/:id',
        {
            schema: {
                summary: "Get specific webhook by ID",
                tags: ["Webhooks"],
                params: z.object({
                    id: z.uuidv7(),
                }),
                response: {
                    200:createSelectSchema(webhooks),
                    404: z.object({ message: z.string() }),
                }
            },
        },
        async (request, reply) => {
            const { id } = request.params
            
            const result = await db
                .select()
                .from(webhooks)
                .where(eq(webhooks.id, id))
                .limit(1)
            
            if (result.length === 0) {
                return reply.status(404).send({ message: "Webhook not found" })
            }
            
            return reply.send(result[0])
        },
    )
}