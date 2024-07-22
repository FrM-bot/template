import { formatUsers } from '@/adapters/users'
import { Services } from '..'

export const getAllUsers = async () => {
  try {
    const response = await fetch(Services.users.getAll)
    const data = await response.json()

    const users = formatUsers(data)

    return {
      data: users,
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error',
    }
  }
}
