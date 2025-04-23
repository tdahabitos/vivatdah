import { Card, Rating } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const testimonials = [
  {
    title: "Comecei a acreditar em mim de novo!",
    avaliation: 5,
    name: "Lucas Andrade",
    testimonial:
      "Sempre achei que estudar era uma tortura. A VivaTDAH me mostrou que eu só precisava de uma abordagem diferente. Agora, estudar faz sentido!",
  },
  {
    title: "Estudar finalmente deixou de ser um peso.",
    avaliation: 5,
    name: "Renata Moura",
    testimonial:
      "Com os recursos da VivaTDAH, consigo me organizar melhor e não fico mais frustrada com meus esquecimentos. Estou muito mais confiante!",
  },
  {
    title: "Me sinto visto e respeitado.",
    avaliation: 4,
    name: "Pedro Costa",
    testimonial:
      "A plataforma entende como o TDAH funciona. As aulas são rápidas, diretas e consigo pausar sem me perder. Isso fez toda a diferença.",
  },
  {
    title: "Nunca consegui manter o foco por tanto tempo!",
    avaliation: 4,
    name: "Juliana Freitas",
    testimonial:
      "As trilhas curtas e os lembretes visuais me ajudam demais. Pela primeira vez, estou conseguindo seguir uma rotina de estudos.",
  },
  {
    title: "Me ajudou a voltar a estudar depois de anos.",
    avaliation: 5,
    name: "André Luiz",
    testimonial:
      "Achei que não conseguiria mais acompanhar nenhum curso. A VivaTDAH me acolheu e me guiou com paciência. Estou muito feliz com meu progresso!",
  },
  {
    title: "Sinto que tenho controle da minha jornada.",
    avaliation: 5,
    name: "Clara Martins",
    testimonial:
      "Antes, era tudo caos. Agora, com os checklists e metas pequenas, consigo ver meu avanço sem me sobrecarregar.",
  },
  {
    title: "Aprender ficou mais leve.",
    avaliation: 5,
    name: "Felipe Rocha",
    testimonial:
      "Eu tinha vergonha de precisar de ajuda, mas com a VivaTDAH, percebi que estudar do meu jeito é válido. E está funcionando!",
  },
  {
    title: "A motivação voltou a fazer parte da minha vida.",
    avaliation: 5,
    name: "Letícia Souza",
    testimonial:
      "Os pontos, conquistas e mensagens de incentivo realmente me empolgam. Parece bobo, mas me mantém firme.",
  },
];

export default function Testimonial() {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <section>
      <div className="md:flex md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            O que nossos alunos dizem
          </h2>

          <p className="mt-6 leading-relaxed ">
            Histórias inspiradoras de quem encontrou a trilha do desenvolvimento
            pessoal.
          </p>
        </div>
      </div>

      <Splide
        className="mt-8"
        options={{
          perPage: isDesktop ? 3 : isTablet ? 2 : 1,
          gap: "1rem",
          arrows: false,
        }}
      >
        {testimonials.map((item) => (
          <SplideSlide key={item.name}>
            <Card
              withBorder
              className="flex h-full flex-col justify-between p-6 shadow-sm sm:p-8"
            >
              <div>
                <Rating defaultValue={item.avaliation} readOnly />

                <div className="mt-4">
                  <p className="text-2xl font-bold sm:text-2xl">{item.title}</p>

                  <p className="mt-4 leading-relaxed ">
                    <q>{item.testimonial}</q>
                  </p>
                </div>
              </div>

              <footer className="mt-4 text-sm font-medium sm:mt-6">
                - {item.name}
              </footer>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
