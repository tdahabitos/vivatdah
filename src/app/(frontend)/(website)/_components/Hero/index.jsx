import { Button, Container, Text, Title } from "@mantine/core";
import { Dots } from "./dots";
import classes from "./hero.module.css";
import Link from "next/link";
import { cn } from "@/utils";

export default function Hero() {
  return (
    <Container className={cn(classes.wrapper, "py-6 md:p-8")} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Aprenda no Seu Ritmo com{" "}
          <Text component="span" className={classes.highlight} inherit>
            VivaTDAH
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Acreditamos no potencial de cada pessoa com TDAH. Nossa plataforma
            oferece cursos interativos, adaptados para manter o foco e promover
            o aprendizado contínuo. Com ferramentas personalizadas e suporte
            constante, você pode atingir seus objetivos
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
            component={Link}
            href={"/sobre"}
          >
            Saiba mais
          </Button>
          <Button
            className={classes.control}
            size="lg"
            component={Link}
            href={"/assinatura"}
          >
            Comece Agora
          </Button>
        </div>
      </div>
    </Container>
  );
}
