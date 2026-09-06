import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export const metadata = {
  title: 'Yu-Gi-Oh! FM Deck Builder',
  description: 'Enforce PS1 deck constraints with interactive utilities',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Garanta que o locale recebido é válido
  if (!['en', 'pt'].includes(locale)) {
    notFound();
  }

  // Busca as mensagens no servidor
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
