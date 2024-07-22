import { $SessionStatus } from '@/enums'
import { Routes } from '@/routes'
import { useUserStore } from '@/store'
import type { Session, SessionStatus } from '@/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { getUserById } from '@/services/users'

export function useSession() {
  const { setUser, user } = useUserStore((store) => ({
    setUser: store.setUser,
    user: store.user,
  }))
  const [status, setStatus] = useState<SessionStatus>($SessionStatus.LOADING)
  const navigate = useNavigate()

  // useEffect(() => {
  //   try {
  //     setUser({
  //       id: '1',
  //       username: 'Franco',
  //       email: 'franco@gmail.com',
  //       fullName: 'Franco',
  //       role: $UserRole.USER,
  //     })
  //     setStatus($SessionStatus.AUTHENTICATED)
  //   } catch (error) {
  //     console.error(error)
  //     setStatus($SessionStatus.UNAUTHENTICATED_ERROR)
  //   }
  //   return () => {
  //     setUser(null)
  //   }
  // }, [setUser])

  const signOut = () => {
    // Limpiar el estado global cuando se cierra la sesión
    navigate(Routes.logIn)
    setUser(null)
    setStatus($SessionStatus.UNAUTHENTICATED)
  }

  const setSession = (session: Session) => {
    setUser(session)
    setStatus($SessionStatus.AUTHENTICATED)
  }

  return {
    user,
    status,
    signOut,
    setSession,
  }
}
