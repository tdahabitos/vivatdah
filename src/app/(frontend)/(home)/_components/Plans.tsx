import { Button, Divider } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function Plans() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold sm:text-5xl">
          Escolha o Plano Certo para Você
        </h2>

        <p className="mx-auto mt-4  ">
          Nossos planos foram criados para atender às suas necessidades
          específicas. Escolha o que melhor se adapta ao seu ritmo de
          aprendizado.
        </p>

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium ">
                  Starter
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold sm:text-4xl">
                    {" "}
                    R$ 149,90{" "}
                  </strong>

                  <span className="text-sm font-medium ">/Mês</span>
                </p>
              </div>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Aulas ao vivo</span>
                </li>
                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Acesso ilimitadas</span>
                </li>

                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Cursos ativos: 1</span>
                </li>
              </ul>

              <Divider my="lg" />

              <Button variant="light" size="xl">
                Assinar
              </Button>
            </div>

            <div className="rounded-2xl border-2 border-blue-600 p-6 shadow-sm sm:px-8 lg:p-12">
              <div className="text-center">
                <h2 className="text-lg font-medium ">
                  Pro
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold sm:text-4xl">
                    {" "}
                    R$ 249,90{" "}
                  </strong>

                  <span className="text-sm font-medium ">/Mês</span>
                </p>
              </div>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Acesso ao conteúdo gravado</span>
                </li>

                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Aulas ao vivo</span>
                </li>
                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Aulas: Ilimitadas</span>
                </li>
                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Cursos: Ilimitados</span>
                </li>
                <li className="flex items-center gap-1">
                  <IconCheck color="teal" size={16} />
                  <span>Cursos ativos: 5</span>
                </li>
              </ul>

              <Divider my="lg" />

              <Button size="xl">Assinar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
