import type { FastifyInstance } from 'fastify'
import { getUsers, getUser } from '../controllers/users.controller.js'

async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/users', getUsers)
    fastify.get('/users/:id', getUser)
}

export default userRoutes
