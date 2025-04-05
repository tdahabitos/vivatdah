import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@/globals.css'

import { Notifications } from '@mantine/notifications'

import { payload } from '@/services/payload'

import {
  ColorSchemeScript,
  Divider,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core'
import getMetadata from '@/utils/metadata'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export const metadata = getMetadata({
  title: 'VivaTDAH',
  description: 'A melhor plataforma TDAH do Brasil',
})

const theme = createTheme({
  /* Custom colors */
  colors: {
    'viva-orange': [
      '#fff6e0',
      '#ffebca',
      '#ffd699',
      '#ffbf63',
      '#ffac36',
      '#ffa018',
      '#ff9904',
      '#e48500',
      '#cb7500',
      '#b16400',
    ],
    'viva-purple': [
      '#eef0fc',
      '#d8dcf3',
      '#adb5e9',
      '#808cdf',
      '#5a69d8',
      '#4453d3',
      '#3848d3',
      '#2b3abb',
      '#2433a7',
      '#1a2b93',
    ],
  },
  defaultRadius: 'md',
  primaryColor: 'viva-orange',
})

export default async function RootLayout({ children }) {
  const { maintenance_mode: maintenanceMode } = await payload.findGlobal({
    slug: 'administration',
  })

  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GWMRV34BQ7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-GWMRV34BQ7');
            `,
          }}
        />

        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          {maintenanceMode ? (
            <div className="h-screen w-full flex justify-center items-center relative">
              <div className="absolute top-4 right-4">
                <ThemeSwitcher />
              </div>
              <div className="space-y-4">
                <img src="/logo.svg" alt="VivaTDAH" className="h-28 w-auto mx-auto" />
                <Divider />
                <h1 className="text-xl font-bold">Voltamos em breve</h1>
              </div>
            </div>
          ) : (
            children
          )}
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  )
}
