import { IconArrowBigRightFilled, IconMenu2, IconUserSquareRounded } from '@tabler/icons-react'
import { ActionIcon, Box, Button, Divider, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Logo from '@/components/Logo'
import Link from 'next/link'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false)
  const pathname = usePathname()

  const menu = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Sobre',
      href: '/sobre',
    },
    {
      label: 'Trilhas',
      href: '/trilhas',
    },
    {
      label: 'O que esperar?',
      href: '/o-que-esperar',
    },
    {
      label: 'Assinatura',
      href: '/assinatura',
    },
    {
      label: 'Blog',
      href: 'https://tdah.blog',
      target: '_blank',
    },
  ]

  return (
    <>
      <Box className="sticky top-0 z-50 border-y dark:border-t-0 bg-[var(--mantine-color-body)] shadow-lg">
        <div className="mx-auto flex flex-wrap min-h-24 max-w-screen-xl justify-center sm:justify-between items-center gap-8 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center gap-4">
            <ActionIcon className="lg:hidden" variant="filled" onClick={open}>
              <IconMenu2 size={18} />
            </ActionIcon>
            <Button component={Link} href="/" variant="transparent" h="auto" p={0} radius={0}>
              <Logo className="h-20 w-auto" />
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-end lg:justify-between">
            <nav aria-label="Global" className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm">
                {menu.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        'transition hover:underline',
                        pathname === item.href &&
                          ' text-viva-orange-600 hover:text-viva-orange-500 ',
                      )}
                      href={item.href}
                      target={item.target}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="items-center flex gap-4">
                <ThemeSwitcher />
                <Button
                  component={Link}
                  href="/assinatura"
                  rightSection={<IconArrowBigRightFilled size={18} />}
                >
                  Assinar
                </Button>
                <Button
                  variant="light"
                  leftSection={<IconUserSquareRounded size={18} />}
                  component={Link}
                  href="/dashboard"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Drawer opened={opened} onClose={close} title={<Logo className={'h-20 w-auto'} />}>
        <Divider my="sm" />
        <ul className="flex flex-col gap-6">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                className="transition hover:text-gray-500/75"
                href={item.href}
                target={item.target}
                onClick={close}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  )
}
