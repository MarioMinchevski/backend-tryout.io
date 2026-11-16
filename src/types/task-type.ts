type TaskStatus = 'todo' | 'in_progress' | 'done'
type TaskPriority = 'low' | 'medium' | 'high'

type Task = {
    id: string
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    dueDate?: string
    ownerId: string
    assigneeId?: string
    createdAt: string
    updatedAt: string
}

type CreateTaskBody = {
    title: string
    ownerId: string
    description?: string
    priority?: TaskPriority
    dueDate?: string
    assigneeId?: string
}

type UpdateTaskBody = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    dueDate?: string
    assigneeId?: string
}

type TaskIdRoute = { Params: { id: string } }
type CreateTaskRoute = { Body: CreateTaskBody }
type UpdateTaskRoute = TaskIdRoute & { Body: UpdateTaskBody }

type TaskSort = 'dueDate' | '-dueDate'

type TaskQuery = {
    status?: TaskStatus
    priority?: TaskPriority
    assigneeId?: string
    search?: string
    sort?: TaskSort
    page: number
    limit: number
}

type TaskPage = {
    data: Task[]
    page: number
    limit: number
    total: number
    totalPages: number
}

type ListTasksRoute = { Querystring: TaskQuery }

export type {
    Task,
    TaskStatus,
    TaskPriority,
    CreateTaskBody,
    UpdateTaskBody,
    TaskIdRoute,
    CreateTaskRoute,
    UpdateTaskRoute,
    TaskSort,
    TaskQuery,
    TaskPage,
    ListTasksRoute
}