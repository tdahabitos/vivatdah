"use client";

import Logo from "@/components/Logo";
import { ActionIcon, AppShell, Burger, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import GeneralSearch from "./_components/GeneralSearch";
import CtaButton from "./_components/CtaButton";
import ThemeSwitcher from "./_components/ThemeSwitcher";
import AccountButton from "./_components/AccountButton";
import Sidebar from "./_components/Sidebar";
import { IconMenu2 } from "@tabler/icons-react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      withBorder={false}
      header={{ height: 96 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="border-b">
        <div className="flex h-full w-full items-center px-4">
          <div className="flex h-full w-full max-w-[224px] items-center gap-2">
            <ActionIcon onClick={toggle} variant="light">
              <IconMenu2 size={18} />
            </ActionIcon>

            <Logo className="h-20 w-auto" />
          </div>
          <div className="flex w-full items-center gap-4 ml-4">
            <GeneralSearch />

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
          <Sidebar />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main pb="xl">{children}</AppShell.Main>
    </AppShell>
  );
}
