'use client';

import { useState, useMemo } from 'react';
import { YugiohFMCard, CardType, GuardianStar } from '@/types/card';
import { CardTile } from './CardTile';
import rawCards from '@/data/cards.json';
import { useTranslations } from 'next-intl';

interface CardGridProps {
  onAddCard: (card: YugiohFMCard) => void;
}

// 1. Mapeamento oficial dos IDs de Tipo do Forbidden Memories
const TYPE_MAP: Record<number, CardType> = {
  0: 'Dragon', 1: 'Spellcaster', 2: 'Zombie', 3: 'Warrior', 4: 'Beast-Warrior',
  5: 'Beast', 6: 'Winged Beast', 7: 'Fiend', 8: 'Fairie', 9: 'Insect',
  10: 'Dinosaur', 11: 'Reptile', 12: 'Fish', 13: 'Sea Serpent', 14: 'Machine',
  15: 'Thunder', 16: 'Aqua', 17: 'Pyro', 18: 'Rock', 19: 'Plant',
  20: 'Magic', 21: 'Trap', 22: 'Ritual', 23: 'Equip'
};

// 2. Mapeamento oficial das Estrelas Guardiãs
const STAR_MAP: Record<number, GuardianStar> = {
  0: 'Sun', 1: 'Moon', 2: 'Mercury', 3: 'Venus', 4: 'Mars',
  5: 'Jupiter', 6: 'Saturn', 7: 'Uranus', 8: 'Neptune', 9: 'Pluto'
};

const CARD_TYPES: CardType[] = Object.values(TYPE_MAP);

export function CardGrid({ onAddCard }: CardGridProps) {
  const t = useTranslations('Catalog');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');

  // 3. Adapter Pattern: Transforma o JSON bruto no nosso formato TypeScript ideal
  const typedCards = useMemo(() => {
    return (rawCards as any[]).map((c): YugiohFMCard => {
      const type = TYPE_MAP[c.Type] || 'Magic';
      const isMonster = type !== 'Magic' && type !== 'Trap' && type !== 'Equip' && type !== 'Ritual';

      return {
        id: c.Id,
        name: c.Name,
        type: type,
        // No jogo original, magias têm ATK/DEF salvos como 0 ou -1 no código, convertemos para null
        atk: isMonster ? c.Attack : null,
        def: isMonster ? c.Defense : null,
        guardianStars: isMonster 
          ? [STAR_MAP[c.GuardianStarA] || 'Sun', STAR_MAP[c.GuardianStarB] || 'Moon']
          : null,
        password: c.CardCode || '00000000',
        starChips: c.Stars || 0,
        description: c.Description?.replace(/\r\n/g, ' ') || '' // Limpa quebras de linha esquisitas do PS1
      };
    });
  }, []);

  // Filtra as cartas adaptadas
  const filteredCards = useMemo(() => {
    return typedCards.filter((card) => {
      const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType ? card.type === selectedType : true;
      return matchesSearch && matchesType;
    });
  }, [search, selectedType, typedCards]);

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

      {/* Grid de Resultados com paginação/limite implícito para performance se necessário */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[75vh] overflow-y-auto pr-2 no-scrollbar">
          {filteredCards.map((card) => (
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
        <p>{t('footerText', {filtered: filteredCards.length, total: typedCards.length} )}</p>
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
