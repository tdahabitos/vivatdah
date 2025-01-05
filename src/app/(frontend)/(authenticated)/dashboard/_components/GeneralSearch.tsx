import {
  ActionIcon,
  Select,
  SelectProps,
  Text,
  TextInput,
} from "@mantine/core";

import {
  IconAlignJustified,
  IconCheck,
  IconFileText,
  IconMicrophoneFilled,
  IconNotebook,
  IconPhoto,
  IconSearch,
  IconVideo,
} from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";

const searchTypes = [
  {
    icon: <IconAlignJustified size={16} />,
    type: "all",
    color: "red",
  },
  {
    icon: <IconFileText size={16} />,
    type: "pdf",
    color: "red",
  },
  {
    icon: <IconVideo size={16} />,
    type: "video",
    color: "red",
  },
  {
    icon: <IconFileText size={16} />,
    type: "pdf",
    color: "red",
  },
  {
    icon: <IconPhoto size={16} />,
    type: "img",
    color: "violet",
  },
  {
    icon: <IconMicrophoneFilled size={16} />,
    type: "audio",
    filename: "Lorem ipsum",
    color: "blue",
  },
  {
    icon: <IconNotebook size={16} />,
    type: "ebook",
    filename: "Lorem ipsum",
    color: "teal",
  },
];

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => (
  <div className="flex items-center gap-1">
    {checked && <IconCheck size={12} />}
    <div className="flex items-center gap-2">
      {searchTypes.find((item) => item.type === option.value)?.icon}
      <Text size="sm">{option.label}</Text>
    </div>
  </div>
);

export default function GeneralSearch() {
  const [search, setSearch] = useState("");

  async function handleSearch() {
    await axios
      .get(`/api/videos?filters[title][$containsi]=${search}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-1">
      <Select
        className="w-1/4 max-w-xs [&_input]:rounded-r-none [&_input]:border-r-0"
        placeholder="Categoria"
        defaultValue={"all"}
        data={[
          { value: "all", label: "Todos" },
          { value: "video", label: "Vídeo" },
          { value: "audio", label: "Audio" },
          { value: "img", label: "Imagem" },
          { value: "ebook", label: "E-book" },
        ]}
        renderOption={renderSelectOption}
      />
      <TextInput
        className="flex-1 [&_input]:rounded-l-none"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        rightSection={
          <ActionIcon variant="transparent" onClick={handleSearch}>
            <IconSearch size={18} />
          </ActionIcon>
        }
      />
    </div>
  );
}
