import Logo from "@/components/Logo";
import { IconTrophy, IconUserSquareRounded } from "@tabler/icons-react";
import Link from "next/link";
import ThemeSwitcher from "../../(authenticated)/dashboard/_components/ThemeSwitcher";
import { Button } from "@mantine/core";

export default function Header() {
  const menu = [
    {
      label: "Sobre",
      href: "/sobre",
    },
    {
      label: "Cursos",
      href: "#",
    },
    {
      label: "O que esperar?",
      href: "#",
    },
    {
      label: "Assinatura",
      href: "#",
    },
    {
      label: "Blog",
      href: "#",
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/50 border-b">
      <div className="mx-auto flex h-24 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Button component={Link} href="/" variant="transparent" h="auto">
          <Logo className="h-20 w-auto" />
        </Button>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link
                    className="transition hover:text-gray-500/75"
                    href={item.href}
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
              <Button leftSection={<IconTrophy size={18} />}>Assinar</Button>
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
    </header>
  );
}
