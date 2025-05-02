import { Link, Outlet } from 'react-router'
import type { Route } from './+types'
import { useDisclosure } from '@mantine/hooks'
import {
  ActionIcon,
  AppShell,
  Button,
  Divider,
  ScrollArea,
} from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import Logo from '~/components/logo'
import ThemeSwitcher from '~/components/theme-switcher'
import Sidebar from './components/sidebar'
import AuthGuard from '~/components/auth-guard'
import AccountButton from './components/account-button'
import CtaButton from './components/cta-button'
import { apiFetcher } from '~/lib/api'
import Search from '~/components/search'
import { useAuth } from '~/hooks/use-auth'

export async function clientLoader() {
  const categories = await apiFetcher('/categories')
  return { categories }
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData
  const [opened, { close, toggle }] = useDisclosure()
  const { allowedCategories } = useAuth()

  return (
    <AuthGuard>
      <AppShell
        withBorder={false}
        header={{ height: 96 }}
        navbar={{
          width: 240,
          breakpoint: 'sm',
          collapsed: { mobile: !opened, desktop: opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <div className="flex w-full h-full items-center px-4 relative">
            <div className="flex w-full max-w-[224px] items-center gap-2">
              <ActionIcon onClick={toggle} variant="light">
                <IconMenu2 size={18} />
              </ActionIcon>

              <Button
                component={Link}
                to="/"
                variant="transparent"
                h="auto"
                radius={0}
                p={0}
              >
                <Logo className="h-20 w-auto" />
              </Button>
            </div>
            <div className="flex w-full justify-end items-center gap-4 ml-4">
              <div className="flex-1 hidden md:block">
                <Search />
              </div>

              <div className="hidden lg:block">
                <CtaButton />
              </div>

              <ThemeSwitcher />
              <AccountButton />
            </div>
          </div>
          <div className="absolute left-0 right-0 bottom-0">
            <Divider />
          </div>
        </AppShell.Header>

        <AppShell.Navbar>
          <ScrollArea p="md">
            <Sidebar
              categories={categories}
              allowedCategories={allowedCategories}
              close={close}
            />
          </ScrollArea>
        </AppShell.Navbar>

        <AppShell.Main pb="xl">
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  )
}
