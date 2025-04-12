import Logo from '@/components/Logo'
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react'
import Link from 'next/link'

export default function Footer() {
  const menu = [
    {
      title: 'Institucional',
      items: [
        {
          label: 'Sobre nós',
          href: '/sobre',
        },
        {
          label: 'Contato',
          href: '/contato',
        },
      ],
    },

    {
      title: 'Outros projetos',
      items: [
        {
          label: 'Conin TDAH',
          href: 'https://conintdah.com',
        },
        {
          label: 'Analisamente',
          href: 'https://analisamente.com',
        },
      ],
    },
    {
      title: 'Links úteis',
      items: [
        {
          label: 'Blog',
          href: 'https://tdah.blog',
        },
      ],
    },
    {
      title: 'Assinatura',
      items: [
        {
          label: 'Assinatura',
          href: '/assinatura',
        },
        {
          label: 'Trilhas',
          href: '/trilhas',
        },
      ],
    },
    {
      title: 'Autenticação',
      items: [
        {
          label: 'Login',
          href: '/auth/login',
        },
        {
          label: 'Cadastro',
          href: '/auth/register',
        },
      ],
    },
    {
      title: 'Uso da plataforma',
      items: [
        {
          label: 'Politica de Privacidade',
          href: '/politica-de-privacidade',
        },
        {
          label: 'Termos de Serviço',
          href: '/termos-de-servico',
        },
      ],
    },
  ]

  return (
    <footer>
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="w-full max-w-[200px]">
              <Logo className="h-20 w-auto" />
            </div>

            <p className="mt-4 max-w-xs ">
              A VivaTDAH é sua parceira no aprendizado personalizado e eficaz para pessoas com TDAH.
              Estamos comprometidos com o seu sucesso.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link href="#" target="_blank" className="transition hover:opacity-75">
                  <IconBrandFacebook size={24} />
                </Link>
              </li>

              <li>
                <Link href="#" target="_blank" className="transition hover:opacity-75">
                  <IconBrandInstagram size={24} />
                </Link>
              </li>

              <li>
                <Link href="#" target="_blank" className="transition hover:opacity-75">
                  <IconBrandX size={24} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {menu.map((item) => (
              <div key={item.title + Math.random()}>
                <p className="font-medium">{item.title}</p>

                <ul className="mt-6 space-y-4 text-sm">
                  {item.items.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="transition hover:opacity-75">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs ">&copy; 2025 VivaTDAH - Todos os direitos reservados</p>
      </div>
    </footer>
  )
}
