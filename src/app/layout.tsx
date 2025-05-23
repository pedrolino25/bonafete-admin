// eslint-disable-next-line prettier/prettier
import { Toaster } from '@/components/ui/toaster'
import ConfigureAmplifyClientSide from '@/lib/amplify-config'
import { AuthenticatedUserProvider } from '@/lib/hooks/authenticated-user'
import { ReactQueryProvider } from '@/lib/react-query-provider'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Bonafete | Portal de Administração',
    template: '%s | Portal de Administração',
  },
  description:
    'Encontra e reserva o espaço ideal para a tua festa privada. Reserva já e torna o teu evento inesquecível.',
  authors: [{ name: 'Bonafete', url: 'https://bonafete.com' }],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <AuthenticatedUserProvider>{children}</AuthenticatedUserProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
