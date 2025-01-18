import 'dotenv/config';
import { User } from "@/types/user"

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch(`https://backend-users-building-se.onrender.com/users`)
    if (!response.ok) {
        throw new Error('Failed to fetch users')
    }
    return response.json()
}