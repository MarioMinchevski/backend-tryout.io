class AppError extends Error {
    readonly statusCode: number
    readonly code: string

    constructor(statusCode: number, code: string, message: string) {
        super(message)
        this.name = 'AppError'
        this.statusCode = statusCode
        this.code = code
    }
}

const badRequest = (message = 'Bad request', code = 'BAD_REQUEST') => new AppError(400, code, message)
const unauthorized = (message = 'Unauthorized', code = 'UNAUTHORIZED') => new AppError(401, code, message)
const forbidden = (message = 'Forbidden', code = 'FORBIDDEN') => new AppError(403, code, message)
const notFound = (message = 'Not found', code = 'NOT_FOUND') => new AppError(404, code, message)
const conflict = (message = 'Conflict', code = 'CONFLICT') => new AppError(409, code, message)
const internal = (message = 'Internal server error', code = 'INTERNAL_ERROR') => new AppError(500, code, message)

const taskNotFound = (id: string) =>
    notFound(`Task ${id} not found`, 'TASK_NOT_FOUND')

const userNotFound = (id: string) =>
    notFound(`User ${id} not found`, 'USER_NOT_FOUND')

const notTaskOwner = () =>
    forbidden('Only the task owner or an admin can do this', 'NOT_TASK_OWNER')

const invalidStatusChange = (from: string, to: string) =>
    badRequest(`Cannot move a task from ${from} to ${to}`, 'INVALID_STATUS_CHANGE')

export {
    AppError,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    internal,
    taskNotFound,
    userNotFound,
    notTaskOwner,
    invalidStatusChange
}