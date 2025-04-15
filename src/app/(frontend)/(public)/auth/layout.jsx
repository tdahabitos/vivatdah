import { redirect } from 'next/navigation'
import { createClient } from '@/services/supabase/server'

export default async function AuthLayout({ children }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.getUser()

  if (!error) {
    redirect('/dashboard')
  }

  return children
}
