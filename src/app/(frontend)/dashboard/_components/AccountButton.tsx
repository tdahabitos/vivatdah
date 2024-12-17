import { Menu, rem, UnstyledButton, Avatar } from "@mantine/core";
import { IconSettings, IconChevronDown, IconLogout } from "@tabler/icons-react";
import Link from "next/link";

export default function AccountButton() {
  return (
    <Menu width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton className="flex items-center gap-2">
          <Avatar />
          <span className="text-sm">John Doe</span>
          <IconChevronDown size={16} opacity={0.5} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/settings"
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Configurações
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
