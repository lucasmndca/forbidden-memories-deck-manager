import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Aguarda a resolução do locale da requisição
  const safeLocale = locale || 'en';

  return {
    messages: (await import(`../messages/${safeLocale}.json`)).default,
    locale: safeLocale
  };
});
