import type { FastifyRequest } from 'fastify'
import type { UserRole } from '../types/user-type.js'
import { getAllUsers } from '../services/users.service.js'
import { forbidden, unauthorized } from '../utils/error.util.js'

const requireRole = (...allowed: UserRole[]) => async (request: Pick<FastifyRequest, 'headers'>) => {
    const userId = request.headers['x-user-id']
    if (typeof userId !== 'string') throw unauthorized('Missing x-user-id header')

    const user = (await getAllUsers()).find(u => u.id === userId)
    if (!user) throw unauthorized('Unknown user')

    if (!allowed.includes(user.role)) {
        throw forbidden(`Requires role: ${allowed.join(' or ')}`, 'INSUFFICIENT_ROLE')
    }
}

export { requireRole }
