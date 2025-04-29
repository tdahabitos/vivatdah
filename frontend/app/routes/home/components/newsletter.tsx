import { Alert, Button, Card, Loader, TextInput } from "@mantine/core";
import {
  IconArrowBigRightFilled,
  IconBrain,
  IconCircleCheck,
  IconFileDescription,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import type { FormData } from "~/types";
import axios from "axios";

export default function Newsletter() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = z.object({
    email: z
      .string({ message: "O campo é obrigatorio" })
      .email({ message: "E-mail inválido" }),
  });

  const form = useForm({
    validate: zodResolver(validationSchema),
  });

  async function handleSubmit({ email }: FormData) {
    setIsLoading(true);

    await axios
      .post("newsletter", email)
      .then(() => {
        setSent(true);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }

  if (sent) {
    return (
      <section>
        <Card
          withBorder
          className="bg-viva-orange-200 dark:!bg-transparent !p-8 mb-8"
        >
          <div className="flex justify-center items-center gap-2">
            <IconCircleCheck color="green" size={64} />
            <div>
              <span>Obrigado!</span>
              <h2 className="text-2xl tracking-tight font-bold">
                Inscrição realizada com sucesso!
              </h2>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <Card
        withBorder
        className="bg-viva-orange-200 dark:!bg-transparent !p-8 mb-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-4xl tracking-tight font-bold">
                Fique por dentro!
              </h2>
              <p className="mt-4 text-lg ">
                Assine nossa newsletter e receba as últimas atualizações, dicas
                e informações exclusivas sobre TDAH diretamente no seu e-mail.
              </p>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="w-full flex flex-wrap items-start gap-2 mt-6">
                  <TextInput
                    className="w-full flex-1"
                    placeholder="Digite seu email"
                    disabled={isLoading}
                    {...form.getInputProps("email")}
                  />
                  <Button
                    className="w-full md:w-auto"
                    type="submit"
                    disabled={isLoading}
                    rightSection={
                      isLoading ? (
                        <Loader size={16} />
                      ) : (
                        <IconArrowBigRightFilled size={16} />
                      )
                    }
                  >
                    Inscrever-se
                  </Button>
                </div>
              </form>

              {error && (
                <Alert
                  className="mt-4"
                  variant="light"
                  color="red"
                  title="Erro ao enviar"
                >
                  Por favor, tente novamente em alguns instantes.
                </Alert>
              )}
            </div>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <dt className="mt-4 text-base font-semibold ">
                  <div className="flex items-center gap-2">
                    <IconBrain size={24} />
                    <span>Conteúdos especializados</span>
                  </div>
                </dt>
                <dd className="mt-2 text-base/7 ">
                  Buscamos ajudar a entender melhor o transtorno, suas nuances e
                  as melhores práticas para lidar com ele no dia a dia.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <dt className="mt-4 text-base font-semibold ">
                  <div className="flex items-center gap-2">
                    <IconFileDescription size={24} />
                    <span>Noticias</span>
                  </div>
                </dt>
                <dd className="mt-2 text-base/7 ">
                  Acesso em primeira mão a eventos, webinars e novos artigos
                  publicados no site.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Card>
    </section>
  );
}
