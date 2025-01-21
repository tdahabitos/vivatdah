import { Card, Rating } from "@mantine/core";

export default function Testimonial() {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              O que nossos alunos dizem
            </h2>

            <p className="mt-6 max-w-lg leading-relaxed ">
              Leia histórias inspiradoras de quem encontrou o caminho certo para
              aprender com TDAH.
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
  );
}
