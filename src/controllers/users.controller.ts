import type { FastifyReply, FastifyRequest } from 'fastify'
import { getAllUsers, getUserById } from '../services/users.service.js'

const getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await getAllUsers()
    return reply.send(users)
}

const getUser = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const user = await getUserById(request.params.id)
    return reply.send(user)
}

export { getUser, getUsers }