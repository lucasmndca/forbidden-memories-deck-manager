'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { BiChevronDown } from 'react-icons/bi';

export function LanguageDropdown() {
  const locale = useLocale(); // Detecta o idioma atual da URL ('en' ou 'pt')
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    
    // O next-intl exige que substituamos a parte do locale no caminho da URL
    // Dividimos o pathname atual para trocar apenas o prefixo de idioma
    const segments = pathname.split('/');
    segments[1] = nextLocale; // Altera o primeiro segmento (ex: /en/catalogo -> /pt/catalogo)
    const newPath = segments.join('/') || '/';

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="relative inline-block text-left font-mono text-xs">
      <select
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className="appearance-none px-3 py-2 pr-8 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 hover:border-neutral-700 focus:outline-none focus:border-amber-500 font-semibold tracking-wide cursor-pointer transition-colors disabled:opacity-50"
      >
        <option value="en">🇺🇸 English</option>
        <option value="pt">🇧🇷 Português</option>
      </select>
      
      {/* Seta customizada para o dropdown */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-neutral-500 text-sm">
        <BiChevronDown />
      </div>
    </div>
  );
}
