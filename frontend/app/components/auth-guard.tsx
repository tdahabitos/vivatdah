import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '~/hooks/use-auth'

export default function AuthGuard({
  children,
  reverse,
}: {
  children: React.ReactNode
  reverse?: boolean
}) {
  const [hasAccess, setHasAccess] = useState(false)
  const navigate = useNavigate()
  const { init } = useAuth()

  async function getUser() {
    await init()
      .then(() => {
        setHasAccess(true)
      })
      .catch(() => navigate('/auth/login'))
  }

  async function checkUser() {
    await init()
      .then(() => {
        navigate('/dashboard')
      })
      .catch(() => setHasAccess(true))
  }

  useEffect(() => {
    reverse ? checkUser() : getUser()
  }, [])

  if (!hasAccess) {
    return null
  }

  return children
}
