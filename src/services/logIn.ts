import { $UserRole } from '@/enums'
import type { LogIn } from '@/schemas/login.schema'

export const logIn = async ({ email, password }: LogIn) => {
  try {
    console.log(email, password)
    //   const response = await Moralis.User.logIn(email, password)

    //   if (!response.id) {
    //     return {
    //       error: 'Ha ocurrido un error',
    //     }
    //   }

    return {
      data: {
        id: '1',
        username: 'Franco',
        email: 'franco@gmail.com',
        fullName: 'Franco',
        role: $UserRole.USER,
        sessionToken: 'asdasdasdasd',
      },
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error',
    }
  }
}
