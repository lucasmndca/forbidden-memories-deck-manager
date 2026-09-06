'use client';

import { useState, useMemo, useEffect } from 'react';
import { YugiohFMCard, CardType, GuardianStar, TYPE_MAP, STAR_MAP } from '@/types/card';
import { CardTile } from './CardTile';
import { useTranslations } from 'next-intl';

interface CardGridProps {
  onAddCard: (card: YugiohFMCard) => void;
}

const CARD_TYPES: CardType[] = Object.values(TYPE_MAP);

export function CardGrid({ onAddCard }: CardGridProps) {
  const t = useTranslations('Catalog');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [cards, setCards] = useState<YugiohFMCard[]>([]);
  const [meta, setMeta] = useState({ totalFound: 0, totalDataset: 722 });
  const [loading, setLoading] = useState(true);

  // Efeito para disparar a busca na API Serverless (com debounce implícito ao interagir)
  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      try {
        const res = await fetch(`/api/cards?search=${encodeURIComponent(search)}&type=${selectedType}`);
        const data = await res.json();

        // Adapter Pattern rodando em cima do lote reduzido recebido da API
        const adapted = data.cards.map((c: any): YugiohFMCard => {
          const type = TYPE_MAP[c.Type] || 'Magic';
          const isMonster = type !== 'Magic' && type !== 'Trap' && type !== 'Equip' && type !== 'Ritual';

          return {
            id: c.Id,
            name: c.Name,
            type: type,
            atk: isMonster ? c.Attack : null,
            def: isMonster ? c.Defense : null,
            level: c.Level || 0,
            guardianStars: isMonster
              ? [STAR_MAP[c.GuardianStarA] || 'Sun', STAR_MAP[c.GuardianStarB] || 'Moon']
              : null,
            password: c.CardCode || '00000000',
            starChips: c.Stars || 0,
            description: c.Description?.replace(/\r\n/g, ' ') || ''
          };
        });

        setCards(adapted);
        setMeta({ totalFound: data.totalFound, totalDataset: data.totalDataset });
      } catch (err) {
        console.error("Erro ao buscar cartas da API Serverless:", err);
      } finally {
        setLoading(false);
      }
    }

    // Pequeno atraso (Debounce) na busca por texto para não sobrecarregar a API a cada tecla digitada
    const delayDebounce = setTimeout(() => {
      fetchCards();
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedType]);

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/30">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-sm transition-colors"
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:border-amber-500 text-sm transition-colors cursor-pointer"
        >
          <option value="">{t('allTypes')}</option>
          {CARD_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Grid de Resultados / Loading */}
      {loading ? (
        <div className="text-center py-24 text-amber-500/70 font-mono text-sm animate-pulse tracking-widest">
          LOADING CATALOG...
        </div>
      ) : cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[75vh] overflow-y-auto pr-2 no-scrollbar">
          {cards.map((card) => (
            <CardTile key={card.id} card={card} onAdd={onAddCard} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500 text-sm">
          {t('empty')}
        </div>
      )}

      {/* Rodapé de Créditos da Base de Dados */}
      <footer className="mt-4 pt-4 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-500 font-mono">
        <p>{t('footerText', { filtered: meta.totalFound, total: meta.totalDataset })}</p>
        <div className="grid gap-1">
          <div>
            <span>{t('projectBy')} </span>
            <a href="https://github.com/lucasmndca" target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-500 underline underline-offset-4 decoration-neutral-800 hover:decoration-amber-500/40 transition-colors">@lucasmndca</a>
          </div>
          <div>
            <span>{t('datasetBy')}</span>
            <a
              href="https://github.com/Solumin/YGO-FM-FusionCalc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-500 underline underline-offset-4 decoration-neutral-800 hover:decoration-amber-500/40 transition-colors"
            >
              @Solumin
            </a>
            <span>(</span>
            <a
              href="https://github.com/Solumin/YGO-FM-FusionCalc/blob/master/data/Cards.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-500 hover:underline transition-colors"
            >
              Cards.json
            </a>
            <span>)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
