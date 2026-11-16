import type { FastifyInstance } from 'fastify'
import { getTask, getTasks, addTask, editTask, removeTask } from '../controllers/tasks.controller.js'
import { requireRole } from '../middleware/auth.middleware.js'
import type { CreateTaskRoute, ListTasksRoute, TaskIdRoute, UpdateTaskRoute } from '../types/task-type.js'

const taskSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        priority: { type: 'string' },
        dueDate: { type: 'string' },
        ownerId: { type: 'string' },
        assigneeId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
    }
}

const listTasksSchema = {
    querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
            status: { type: 'string', enum: ['todo', 'in_progress', 'done'] },
            priority: { type: 'string', enum: ['low', 'medium', 'high'] },
            assigneeId: { type: 'string' },
            search: { type: 'string', minLength: 2, maxLength: 100 },
            sort: { type: 'string', enum: ['dueDate', '-dueDate'] },
            page: { type: 'integer', minimum: 1, default: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'array', items: taskSchema },
                page: { type: 'integer' },
                limit: { type: 'integer' },
                total: { type: 'integer' },
                totalPages: { type: 'integer' }
            }
        }
    }
}

const createTaskSchema = {
    body: {
        type: 'object',
        required: ['title', 'ownerId'],
        additionalProperties: false,
        properties: {
            title: { type: 'string', minLength: 1 },
            ownerId: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'] },
            dueDate: { type: 'string', format: 'date' },
            assigneeId: { type: 'string' }
        }
    }
}

const updateTaskSchema = {
    body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
            title: { type: 'string', minLength: 1 },
            description: { type: 'string' },
            status: { type: 'string', enum: ['todo', 'in_progress', 'done'] },
            priority: { type: 'string', enum: ['low', 'medium', 'high'] },
            dueDate: { type: 'string', format: 'date' },
            assigneeId: { type: 'string' }
        }
    }
}

const adminOnly = requireRole('admin')
const adminOrUser = requireRole('admin', 'user')

async function tasksRoutes(fastify: FastifyInstance) {
    fastify.get<ListTasksRoute>('/tasks', { schema: listTasksSchema }, getTasks)
    fastify.get('/tasks/:id', getTask)

    fastify.post<CreateTaskRoute>('/tasks', {
        schema: createTaskSchema,
        preHandler: adminOnly
    }, addTask)

    fastify.patch<UpdateTaskRoute>('/tasks/:id', {
        schema: updateTaskSchema,
        preHandler: adminOrUser
    }, editTask)

    fastify.delete<TaskIdRoute>('/tasks/:id', {
        preHandler: adminOnly
    }, removeTask)
}

export default tasksRoutes
