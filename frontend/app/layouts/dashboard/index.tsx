import { Link, Outlet } from "react-router";
import type { Route } from "./+types";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, AppShell, Button, ScrollArea } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import Logo from "~/components/logo";
import ThemeSwitcher from "~/components/theme-switcher";
import Sidebar from "./components/sidebar";
import AuthGuard from "~/components/auth-guard";
import AccountButton from "./components/account-button";
import CtaButton from "./components/cta-button";
import api, { globalApi } from "~/lib/api";
import Search from "~/components/search";
import { useAuthConfig } from "~/store/auth-config-store";
import { useEffect } from "react";

export async function loader() {
  const { auth_private_mode: isPrivateAuthMode } = await globalApi({
    slug: "authentication",
    select: {
      auth_private_mode: true,
    },
  });

  const categories = await api({
    collection: "categories",
    sort: ["title"],
  });

  return { isPrivateAuthMode, categories };
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const { isPrivateAuthMode, categories } = loaderData;
  const [opened, { close, toggle }] = useDisclosure();
  const { setIsPrivateAuthMode } = useAuthConfig();

  useEffect(() => {
    setIsPrivateAuthMode(isPrivateAuthMode);
  }, []);

  return (
    <AuthGuard>
      <AppShell
        withBorder={false}
        header={{ height: 96 }}
        navbar={{
          width: 240,
          breakpoint: "sm",
          collapsed: { mobile: !opened, desktop: opened },
        }}
        padding="md"
      >
        <AppShell.Header className="border-b">
          <div className="flex h-full w-full items-center px-4">
            <div className="flex h-full w-full max-w-[224px] items-center gap-2">
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
        </AppShell.Header>

        <AppShell.Navbar>
          <ScrollArea p="md">
            <Sidebar categories={categories} close={close} />
          </ScrollArea>
        </AppShell.Navbar>

        <AppShell.Main pb="xl">
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
}
