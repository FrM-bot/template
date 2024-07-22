import type { SignUp } from '@/schemas/signUp.schema'

export const signUp = async ({ email, password, fullName, username }: SignUp) => {
  try {
    console.log(email, password, fullName, username)
    //   const response = await Moralis.Cloud.run(Services.auth.signUp, {
    //     objectData: {
    //       email,
    //       password,
    //       username,
    //       fullName,
    //     },
    //   })

    //   if (response.status === 'error') {
    //     return {
    //       error: 'Ha ocurrido un error',
    //     }
    //   }

    return {
      success: 'Registro exitoso',
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error',
    }
  }
}
