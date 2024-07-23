import { $SessionStatus, $UserRole } from '@/enums'
// import { getUserById } from '@/services/users'
import type GetSession from '@/response/users/getSession.json'
import { Routes } from '@/routes'
import { Services } from '@/services'
import { useUserStore } from '@/store'
import type { Session, SessionStatus } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCookies, { $CookieKey } from '../useCookies'

const SESSION_DAYS = 7

const formatUserSession = (response: typeof GetSession): Session => {
  return {
    id: String(response.id),
    username: response.username,
    email: response.email,
    fullName: response.name,
    role: $UserRole.USER,
  }
}

const getSession = async () => {
  try {
    const response = await fetch(Services.users.getSession)
    const data = await response.json()

    const session = formatUserSession(data)
    return {
      data: session,
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Ha ocurrido un error',
    }
  }
}

export function useSession() {
  const { setUser, user } = useUserStore((store) => ({
    setUser: store.setUser,
    user: store.user,
  }))
  const [status, setStatus] = useState<SessionStatus>($SessionStatus.LOADING)
  const { cookies, setCookie } = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (cookies[$CookieKey.SessionToken] && user === null) {
      getSession()
        .then((session) => {
          if (session.data) {
            setUser(session.data)
            setStatus($SessionStatus.AUTHENTICATED)
          }

          if (session.error) setStatus($SessionStatus.UNAUTHENTICATED)
        })
        .catch((error) => {
          console.error(error)
          setStatus($SessionStatus.UNAUTHENTICATED_ERROR)
        })
    }
  }, [cookies[$CookieKey.SessionToken], user, setUser])

  const signOut = () => {
    // Limpiar el estado global cuando se cierra la sesión
    navigate(Routes.logIn)
    setCookie({
      name: $CookieKey.SessionToken,
      maxAge: 0,
    })
    setUser(null)
    setStatus($SessionStatus.UNAUTHENTICATED)
    window.location.reload()
  }

  const setSession = (session: Session) => {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS)
    setCookie({
      name: $CookieKey.SessionToken,
      value: session.fullName,
      expires,
      httpOnly: true,
      secure: true,
      path: '/',
    })
    setUser(session)
    setStatus($SessionStatus.AUTHENTICATED)
    window.location.reload()
  }

  return {
    user,
    status,
    signOut,
    setSession,
  }
}
