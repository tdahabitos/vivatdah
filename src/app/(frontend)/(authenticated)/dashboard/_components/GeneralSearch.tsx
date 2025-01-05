import { ActionIcon, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function GeneralSearch() {
  const { push } = useRouter();

  const form = useForm({
    initialValues: {
      value: "",
    },
  });

  function onSubmit({ value }: { value: string }) {
    if (!value) return;

    push(`/dashboard/search?value=${value}`);
  }

  return (
    <form className="flex flex-1" onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        className="flex-1"
        placeholder="Pesquisar"
        rightSection={
          <ActionIcon type="submit" variant="light">
            <IconSearch size={18} />
          </ActionIcon>
        }
        {...form.getInputProps("value")}
      />
    </form>
  );
}
