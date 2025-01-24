import { Menu, rem, UnstyledButton, Avatar } from "@mantine/core";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/services/supabase/client";

export default function AccountButton() {
  const { user, setUser } = useUserStore();
  const { push } = useRouter();

  return (
    <Menu width={200} position="bottom-end">
      <Menu.Target>
        <UnstyledButton className="flex items-center gap-2">
          <Avatar src={user?.user_metadata?.avatar} />
          <span className="text-sm">
            {user?.user_metadata?.full_name || user?.email}
          </span>
          <IconChevronDown size={16} opacity={0.5} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/dashboard/settings"
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Perfil e configurações
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
