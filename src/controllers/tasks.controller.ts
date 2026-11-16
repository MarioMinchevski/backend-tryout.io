import type { FastifyReply, FastifyRequest } from 'fastify'
import { listTasks, getTaskById, createTask, deleteTask, updateTask } from '../services/tasks.service.js'
import type { CreateTaskBody, ListTasksRoute, UpdateTaskBody } from '../types/task-type.js'


const getTasks = async (request: FastifyRequest<ListTasksRoute>, reply: FastifyReply) => {
    const page = await listTasks(request.query)
    return reply.send(page)
}

const getTask = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const task = await getTaskById(request.params.id)
    return reply.send(task)
}

const addTask = async (request: FastifyRequest<{ Body: CreateTaskBody }>, reply: FastifyReply) => {
    const task = await createTask(request.body)
    return reply.code(201).send(task)
}

const editTask = async (
    request: FastifyRequest<{ Params: { id: string }; Body: UpdateTaskBody }>,
    reply: FastifyReply
) => {
    const task = await updateTask(request.params.id, request.body)
    return reply.send(task)
}

const removeTask = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    await deleteTask(request.params.id)
    return reply.code(204).send()
}


export {
    getTasks,
    getTask,
    addTask,
    editTask,
    removeTask
}