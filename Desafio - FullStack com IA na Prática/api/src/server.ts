import fastify from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors} from "@fastify/cors";
import ScalarApiReference from '@scalar/fastify-api-reference'
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { listWebhooks } from "@/routes/list-webhooks";
import {webhooks} from "@/db/schema";
import {getWebhook} from "@/routes/get-webhook";
import {deleteWebhook} from "@/routes/delete-webhook";
import {captureWebhook} from "@/routes/capture-webhook";


const App = fastify().withTypeProvider<ZodTypeProvider>()

App.setValidatorCompiler(validatorCompiler)
App.setSerializerCompiler(serializerCompiler)

App.register(fastifyCors, {
    origin: true,
    methods: [ "GET","POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    // credential: true,
})

App.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Webhook Inspector API",
            version: "1.0.0",
            description: "API for capturing and inspecting webhook requests",
        },
    },
})

App.register(listWebhooks)
App.register(getWebhook)
App.register(deleteWebhook)
App.register(captureWebhook)

App.register(ScalarApiReference, {
    routePrefix: "/docs",
})

App.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('🔥 HTTP server running on http://localhost:3333');
    console.log('📚 Docs available on http://localhost:3333/docs');
})