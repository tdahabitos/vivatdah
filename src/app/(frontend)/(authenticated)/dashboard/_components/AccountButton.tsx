import { Menu, rem, UnstyledButton, Avatar } from "@mantine/core";
import { IconSettings, IconChevronDown, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { createClient } from "@/services/supabase/client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function AccountButton() {
  const supabase = createClient();
  const { user, setUser } = useUserStore();
  const { push } = useRouter();

  return (
    <Menu width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton className="flex items-center gap-2">
          <Avatar />
          <span className="text-sm">{user?.full_name || user?.email}</span>
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
          onClick={async () => {
            await supabase.auth.signOut();
            setUser(null);
            push("/auth/login");
          }}
        >
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
