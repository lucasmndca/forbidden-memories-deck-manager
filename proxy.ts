import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Lista de todos os locais suportados
  locales: ['en', 'pt'],
  
  // Local padrão quando nenhuma subrota é informada
  defaultLocale: 'en'
});

export const config = {
  // Matcher para interceptar apenas rotas de páginas internacionais
  matcher: ['/', '/(de|en|pt)/:path*']
};
