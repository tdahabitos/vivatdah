"use client";

import Logo from "@/components/Logo";
import { AppShell, Burger, Button, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import GeneralSearch from "./_components/GeneralSearch";
import CtaButton from "./_components/CtaButton";
import ThemeSwitcher from "./_components/ThemeSwitcher";
import Notifications from "./_components/Notifications";
import AccountButton from "./_components/AccountButton";
import Sidebar from "./_components/Sidebar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      withBorder={false}
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex h-full w-full items-center px-4">
          <div className="flex h-full w-full max-w-[224px] items-center">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Button variant="transparent" p={0} component={Link} href="/">
              <Logo />
            </Button>
          </div>
          <div className="flex w-full items-center gap-4 ml-4">
            <GeneralSearch />
            <CtaButton />
            <ThemeSwitcher />
            <Notifications />
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
