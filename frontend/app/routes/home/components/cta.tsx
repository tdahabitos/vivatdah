export default function Cta() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:items-center md:gap-8">
        <div className="md:col-span-4">
          <img src="/images/home/cta-cover.png" className="rounded" alt="" />
        </div>

        <div className="md:col-span-2">
          <div className="max-w-lg md:max-w-none">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Junte-se e transforme o mundo com a gente!
            </h2>

            <p className="mt-4">
              Nossa plataforma foi criada com um propósito claro: tornar o
              aprendizado mais acessível, prático e leve para pessoas com TDAH.
            </p>
            <p className="mt-4">
              Sabemos que a maneira tradicional de estudar muitas vezes não
              funciona para quem vive com dificuldades de foco, organização e
              motivação.
            </p>
            <p className="mt-4">
              Por isso, desenvolvemos um ambiente que respeita o ritmo de cada
              pessoa, usando métodos que estimulam o engajamento e reduzem a
              sobrecarga mental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
