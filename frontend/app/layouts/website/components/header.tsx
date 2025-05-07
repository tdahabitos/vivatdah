import {
  IconArrowBigRightFilled,
  IconMenu2,
  IconUserSquareRounded,
} from '@tabler/icons-react'
import { ActionIcon, Box, Button, Divider, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { cn } from '~/utils'
import { Link, useLocation } from 'react-router'
import Logo from '~/components/logo'
import ThemeSwitcher from '~/components/theme-switcher'
import type { MenuItem } from '~/types'
import { useAuth } from '~/hooks/use-auth'

export default function Header({ menu }: { menu: MenuItem[] }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { user } = useAuth()
  const { pathname } = useLocation()

  const addonMenu = [
    {
      id: 'home',
      title: 'Home',
      slug: '/',
    },
    ...menu.filter((item) => item.show_at_menu),
    {
      id: 'blog',
      title: 'Blog',
      slug: 'https://tdah.blog',
      target: '_blank',
    },
  ]

  const menuList = addonMenu.map((item) => (
    <li key={item.id}>
      <Link
        className={cn(
          'transition hover:underline',
          pathname === `/${item.slug}` &&
            'text-viva-orange-600 hover:text-viva-orange-500'
        )}
        to={item.slug}
        target={item?.target}
      >
        {item.title}
      </Link>
    </li>
  ))

  console.log(user)

  return (
    <>
      <Box className="sticky top-0 z-50 bg-[var(--mantine-color-body)]">
        <div className="mx-auto flex flex-wrap min-h-24 max-w-screen-xl justify-center sm:justify-between items-center gap-8 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center gap-4">
            <ActionIcon className="lg:hidden" variant="filled" onClick={open}>
              <IconMenu2 size={18} />
            </ActionIcon>
            <Button
              component={Link}
              to="/"
              variant="transparent"
              h="auto"
              p={0}
              radius={0}
            >
              <Logo className="h-20 w-auto" />
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-end lg:justify-between">
            <nav aria-label="Global" className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm">{menuList}</ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="items-center flex gap-4">
                <ThemeSwitcher />
                {!user && (
                  <Button
                    component={Link}
                    to="/assinatura"
                    rightSection={<IconArrowBigRightFilled size={18} />}
                  >
                    Assinar
                  </Button>
                )}
                <Button
                  variant="light"
                  leftSection={<IconUserSquareRounded size={18} />}
                  component={Link}
                  to={user ? '/dashboard' : '/auth/login'}
                >
                  {user ? 'Dashboard' : 'Login'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Divider className="mb-12" />
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        title={<Logo className={'h-20 w-auto'} />}
      >
        <Divider my="sm" />
        <ul className="flex flex-col gap-6">{menuList}</ul>
      </Drawer>
    </>
  )
}
