import { Paper } from '@mantine/core'
import Logo from '~/components/logo'
import { Outlet } from 'react-router'

export default function Auth() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <Paper w="100%" maw="450px" p="xl" withBorder>
        <div className="flex justify-center mb-4">
          <Logo className="h-20 w-auto" />
        </div>

        <Outlet />
      </Paper>
    </div>
  )
}
