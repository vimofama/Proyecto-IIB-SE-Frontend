import { User } from "@/types/user"

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch('http://localhost:3000/users')
    if (!response.ok) {
        throw new Error('Failed to fetch users')
    }
    return response.json()
}