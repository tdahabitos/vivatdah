import { Button } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export default function CtaButton() {
  return (
    <Button
      component={Link}
      href="https://analisamente.com"
      target="_blank"
      leftSection={<IconExternalLink size={18} />}
    >
      <span className="font-light">Conheça:</span>
      <span className="ml-1 font-bold">analisamente.com</span>
    </Button>
  );
}
