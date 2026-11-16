import { readFile, writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import type { CreateTaskBody, Task, TaskPage, TaskQuery, UpdateTaskBody } from '../types/task-type.js'
import { taskNotFound } from '../utils/error.util.js'

const TASKS_FILE = path.join(process.cwd(), 'src/data/data-tasks.json')

let cache: Task[] | undefined

const readTasks = async (): Promise<Task[]> => {
    cache ??= JSON.parse(await readFile(TASKS_FILE, 'utf-8')) as Task[]
    return cache
}

const writeTasks = async (tasks: Task[]): Promise<void> => {
    cache = tasks
    await writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8')
}

const listTasks = async (query: TaskQuery): Promise<TaskPage> => {
    const { status, priority, assigneeId, search, sort, page, limit } = query
    const term = search?.toLowerCase()

    const results = (await readTasks()).filter(task =>
        (!status || task.status === status) &&
        (!priority || task.priority === priority) &&
        (!assigneeId || task.assigneeId === assigneeId) &&
        (!term || task.title.toLowerCase().includes(term))
    )

    if (sort) {
        const direction = sort === 'dueDate' ? 1 : -1
        results.sort((a, b) => {
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return direction * a.dueDate.localeCompare(b.dueDate)
        })
    }

    const start = (page - 1) * limit
    return {
        data: results.slice(start, start + limit),
        page,
        limit,
        total: results.length,
        totalPages: Math.ceil(results.length / limit)
    }
}

const getTaskById = async (id: string): Promise<Task> => {
    const task = (await readTasks()).find(t => t.id === id)
    if (!task) throw taskNotFound(id)
    return task
}

const createTask = async (data: CreateTaskBody): Promise<Task> => {
    const tasks = await readTasks()
    const now = new Date().toISOString()

    const task: Task = {
        ...data,
        id: randomUUID(),
        status: 'todo',
        priority: data.priority ?? 'medium',
        createdAt: now,
        updatedAt: now
    }

    await writeTasks([...tasks, task])
    return task
}

const updateTask = async (id: string, changes: UpdateTaskBody): Promise<Task> => {
    const tasks = await readTasks()
    const existing = tasks.find(t => t.id === id)
    if (!existing) throw taskNotFound(id)

    const updated: Task = { ...existing, ...changes, updatedAt: new Date().toISOString() }
    await writeTasks(tasks.map(t => (t.id === id ? updated : t)))
    return updated
}

const deleteTask = async (id: string): Promise<void> => {
    const tasks = await readTasks()
    const remaining = tasks.filter(t => t.id !== id)
    if (remaining.length === tasks.length) throw taskNotFound(id)
    await writeTasks(remaining)
}


export {
    listTasks, getTaskById, updateTask, deleteTask, createTask
}