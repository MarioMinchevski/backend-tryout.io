

import type { FastifyInstance, FastifyPluginOptions, RouteShorthandOptionsWithHandler } from 'fastify'

const serverHealthCheckMessage: string = 'allezgut'
const healthCheckSchema = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    }
}

const getServerHealthCheck: RouteShorthandOptionsWithHandler = {
    schema: {
        response: { 200: { type: 'string', serverHealthCheckMessage: healthCheckSchema } }
    },
    handler: (req, reply) => {
        reply.send(serverHealthCheckMessage)
    }
}

function itemRoutes(fastify: FastifyInstance, options: FastifyPluginOptions, done: (err?: Error) => void) {
    fastify.get('/health', getServerHealthCheck)

    done()
}

export default itemRoutes