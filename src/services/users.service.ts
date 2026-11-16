import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { User } from '../types/user-type.js'
import { userNotFound } from '../utils/error.util.js'

const USERS_FILE = path.join(process.cwd(), 'src/data/data-users.json')

const readUsers = async (): Promise<User[]> => {
    const raw = await readFile(USERS_FILE, 'utf-8')
    return JSON.parse(raw) as User[]
}

const getAllUsers = async (): Promise<User[]> => {
    return readUsers()
}

const getUserById = async (id: string): Promise<User> => {
    const users = await readUsers()
    const user = users.find(u => u.id === id)
    if (!user) throw userNotFound(id)
    return user
}

export {
    getAllUsers,
    getUserById
}
