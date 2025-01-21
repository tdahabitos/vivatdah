import { Button, Image } from "@mantine/core";

export default function Hero() {
  return (
    <section className="overflow-hidden sm:grid sm:grid-cols-2">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold md:text-3xl">
            Aprenda no Seu Ritmo com EduTDAH
          </h2>

          <p className="hidden  md:mt-4 md:block">
            Acreditamos no potencial de cada pessoa com TDAH. Nossa plataforma
            oferece cursos interativos, adaptados para manter o foco e promover
            o aprendizado contínuo. Com ferramentas personalizadas e suporte
            constante, você pode atingir seus objetivos
          </p>

          <div className="mt-4 md:mt-8">
            <Button>Comece Agora</Button>
          </div>
        </div>
      </div>

      <Image
        className="h-56 w-full object-cover sm:h-full"
        src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt=""
      />
    </section>
  );
}
