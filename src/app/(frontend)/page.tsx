"use client";

import Logo from "@/components/Logo";
import { Button, Card, Divider, Rating } from "@mantine/core";
import {
  IconAlignCenter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconCheck,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import ThemeSwitcher from "./(authenticated)/dashboard/_components/ThemeSwitcher";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur ">
        <header>
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a className="block" href="#">
              <span className="sr-only">Home</span>
              <Logo />
            </a>

            <div className="flex flex-1 items-center justify-end md:justify-between">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a className=" transition hover:/75" href="#">
                      {" "}
                      Sobre{" "}
                    </a>
                  </li>

                  <li>
                    <a className=" transition hover:/75" href="#">
                      {" "}
                      Cursos{" "}
                    </a>
                  </li>

                  <li>
                    <a className=" transition hover:/75" href="#">
                      {" "}
                      O que esperar?{" "}
                    </a>
                  </li>

                  <li>
                    <a className=" transition hover:/75" href="#">
                      {" "}
                      Assinatura{" "}
                    </a>
                  </li>

                  <li>
                    <a className=" transition hover:/75" href="#">
                      {" "}
                      Blog{" "}
                    </a>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="items-center sm:flex sm:gap-4">
                  <ThemeSwitcher />
                  <Button leftSection={<IconAlignCenter size={18} />}>
                    Assinar
                  </Button>
                  <Button
                    variant="light"
                    leftSection={<IconUserSquareRounded size={18} />}
                    component={Link}
                    href="/dashboard"
                  >
                    Login
                  </Button>
                </div>

                <button className="block rounded bg-gray-100 p-2.5  transition hover:/75 md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <Divider />
      </div>

      <section className="overflow-hidden sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold md:text-3xl">
              Aprenda no Seu Ritmo com EduTDAH
            </h2>

            <p className="hidden  md:mt-4 md:block">
              Acreditamos no potencial de cada pessoa com TDAH. Nossa plataforma
              oferece cursos interativos, adaptados para manter o foco e
              promover o aprendizado contínuo. Com ferramentas personalizadas e
              suporte constante, você pode atingir seus objetivos
            </p>

            <div className="mt-4 md:mt-8">
              <Button>Comece Agora</Button>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>

      <div className="w-full max-w-[80%] mx-auto mt-8">
        <div className="rounded overflow-hidden">
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/EUfzHKBvkeY?si=h5Ne3A09ftQEUCTn"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Recomendado por alunos e educadores
          </h2>

          <p className="mt-4  sm:text-xl">
            Nossa missão é empoderar pessoas com TDAH a aprenderem de forma
            efetiva e no seu próprio ritmo. Junte-se a milhares que
            transformaram suas jornadas educacionais com a EduTDAH.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            withBorder
            className="flex flex-col rounded-lg px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium ">
              Investidas no sucesso de nossos alunos
            </dt>

            <dd className="text-4xl font-extrabold  md:text-5xl">300h</dd>
          </Card>

          <Card
            withBorder
            className="flex flex-col rounded-lg  px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium ">
              Cursos certificados e adaptados
            </dt>

            <dd className="text-4xl font-extrabold  md:text-5xl">24</dd>
          </Card>

          <Card
            withBorder
            className="flex flex-col rounded-lg  px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium ">
              Ferramentas de apoio exclusivas
            </dt>

            <dd className="text-4xl font-extrabold  md:text-5xl">86</dd>
          </Card>

          <Card
            withBorder
            className="flex flex-col rounded-lg  px-4 py-8 text-center"
          >
            <dt className="order-last text-lg font-medium ">
              Downloads de recursos e materiais
            </dt>

            <dd className="text-4xl font-extrabold  md:text-5xl">150</dd>
          </Card>
        </dl>
      </div>

      <section>
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:flex md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                O que nossos alunos dizem
              </h2>

              <p className="mt-6 max-w-lg leading-relaxed ">
                Leia histórias inspiradoras de quem encontrou o caminho certo
                para aprender com TDAH.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                withBorder
                className="flex h-full flex-col justify-between p-6 shadow-sm sm:p-8"
              >
                <div>
                  <Rating defaultValue={2} />

                  <div className="mt-4">
                    <p className="text-2xl font-bold sm:text-2xl">
                      Minha vida mudou com a EduTDAH!
                    </p>

                    <p className="mt-4 leading-relaxed ">
                      Antes, eu achava que nunca conseguiria me concentrar ou
                      aprender algo novo. Com os recursos e apoio da EduTDAH,
                      finalmente consigo avançar nos estudos e atingir minhas
                      metas!
                    </p>
                  </div>
                </div>

                <footer className="mt-4 text-sm font-medium sm:mt-6">
                  - Maria Silva
                </footer>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      <Divider />

      <footer>
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="w-full max-w-[200px]">
                <Logo />
              </div>

              <p className="mt-4 max-w-xs ">
                A EduTDAH é sua parceira no aprendizado personalizado e eficaz
                para pessoas com TDAH. Estamos comprometidos com o seu sucesso.
              </p>

              <ul className="mt-8 flex gap-6">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    <IconBrandFacebook size={24} />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    <IconBrandInstagram size={24} />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    <IconBrandX size={24} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <p className="font-medium ">Serviços</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Coaching 1:1
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Revisão de Aprendizado
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Consultoria Educacional
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Otimização de Rotinas
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium ">Links úteis</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      FAQ
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Central de Ajuda
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Políticas de Retorno
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium ">Institucional</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Sobre nós
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Contato
                    </a>
                  </li>

                  <li>
                    <a href="#" className="transition hover:opacity-75">
                      Chat
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs ">
            &copy; 2025. EduTDAH. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
