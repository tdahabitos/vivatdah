import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { api, apiFetcher } from '~/lib/api'
import { useUser } from '~/store/user-store'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, setUser, allowedCategories, setAllowedCategories } = useUser()
  const navigate = useNavigate()

  async function getUser() {
    setIsLoading(true)

    return await api('/users/me')
      .then((res) => {
        setUser(res)
        return user
      })
      .finally(() => setIsLoading(false))
  }

  async function getAllowedCategories() {
    if (!user) return

    await api(`/users/access/allowed-categories?email=${user.email}`).then(
      (res) => setAllowedCategories(res)
    )
  }

  async function logout() {
    await apiFetcher.post('/auth/signout')
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    if (!user) return

    getAllowedCategories()
  }, [user])

  return {
    isLoading,
    user,
    isAuthenticated: user !== null,
    allowedCategories,
    logout,
    init: getUser,
    revalidate: getUser,
  }
}
