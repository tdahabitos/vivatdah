import getMetadata from '@/utils/metadata'

export const metadata = getMetadata({
  title: 'VivaTDAH - Sobre',
})

export default function SobrePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sobre</h1>
      <p>
        A Viva TDAH nasceu com o propósito de oferecer conhecimento acessível, confiável e acolhedor
        sobre o Transtorno de Déficit de Atenção com Hiperatividade. Sabemos que viver com TDAH pode
        ser desafiador — tanto para quem tem o diagnóstico quanto para familiares, educadores e
        profissionais da saúde. Por isso, nossa missão é informar e apoiar por meio de conteúdo de
        qualidade.
      </p>

      <p>
        Nossa equipe é formada por especialistas em neurociência, educação e saúde mental,
        comprometidos em transformar informação em ferramenta prática para o dia a dia. Valorizamos
        a empatia, o respeito à individualidade e o uso da ciência para promover bem-estar e
        autonomia.
      </p>

      <p>
        Queremos ser uma fonte segura e positiva para todos que convivem com o TDAH. Acreditamos
        que, com orientação certa, é possível superar obstáculos, desenvolver habilidades e viver
        com mais leveza. Seja bem-vindo à Viva TDAH: um espaço feito para você.
      </p>

      <div className="w-full md:w-1/2 mx-auto mt-8">
        <img src="/cta-cover.png" className="rounded" alt="" />
      </div>
    </div>
  )
}
