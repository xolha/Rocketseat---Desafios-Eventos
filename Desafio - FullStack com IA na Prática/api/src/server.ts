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
    transform: jsonSchemaTransform,
})

App.register( ScalarApiReference, {
    routePrefix: "/docs", //quando o alguém olhar essa rota, ele irá olhar essa documentação (óbvio)
})

App.register(listWebhooks)

App.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log('🔥 HTTP server running on http://localhost:3333');
    console.log('📚 Docs available on http://localhost:3333/docs');
})