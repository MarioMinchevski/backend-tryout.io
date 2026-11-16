type UserRole = 'admin' | 'user'

type User = {
    id: string
    username: string
    email: string
    role: UserRole
}

export type { User, UserRole }