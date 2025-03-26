import { Card } from "@mantine/core";
import React from "react";

export default function Stats() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Recomendado por alunos e educadores
        </h2>

        <p className="mt-4  sm:text-xl">
          Nossa missão é empoderar pessoas com TDAH a aprenderem de forma
          efetiva e no seu próprio ritmo. Junte-se a milhares que transformaram
          suas jornadas educacionais com a VivaTDAH.
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
  );
}
