import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Aguarda a resolução da Promise do locale vindo da requisição
  const locale = await requestLocale;

  // 2. Valida se o locale é suportado, caso contrário define o fallback
  const safeLocale = locale && ['en', 'pt'].includes(locale) ? locale : 'en';

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});