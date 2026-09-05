'use client';

import { DeckItem } from '@/hooks/useDeck';
import { DeckRow } from './DeckRow';

interface DeckPanelProps {
  deck: DeckItem[];
  totalCards: number;
  isDeckValid: boolean;
  onRemoveCard: (id: number) => void;
  onClearDeck: () => void;
}

export function DeckPanel({
  deck,
  totalCards,
  isDeckValid,
  onRemoveCard,
  onClearDeck,
}: DeckPanelProps) {
  return (
    <div className="sticky top-6 flex flex-col h-[calc(100vh-3rem)] p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm">
      {/* Cabeçalho do Painel */}
      <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-lg font-bold text-neutral-100">Meu Deck</h2>
          <p className={`text-xs font-mono mt-0.5 ${isDeckValid ? 'text-green-400 font-bold' : 'text-neutral-400'}`}>
            Status: {isDeckValid ? 'PRONTO (40/40)' : 'INCOMPLETO'}
          </p>
        </div>
        
        {/* Contador Geral */}
        <div className={`px-3 py-1.5 rounded-lg font-mono text-sm font-bold border ${
          isDeckValid 
            ? 'bg-green-950/30 border-green-500/30 text-green-400' 
            : 'bg-amber-950/20 border-amber-500/20 text-amber-400'
        }`}>
          {totalCards} / 40
        </div>
      </div>

      {/* Lista Rolável de Cartas do Deck */}
      <div className="flex-1 overflow-y-auto my-4 pr-1 flex flex-col gap-2 no-scrollbar">
        {deck.length > 0 ? (
          deck.map((item) => (
            <DeckRow
              key={item.card.id}
              card={item.card}
              quantity={item.quantity}
              onRemove={onRemoveCard}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-neutral-800 rounded-lg text-neutral-600 text-xs">
            <span>Seu deck está vazio.</span>
            <span className="mt-1">Adicione cartas do catálogo ao lado!</span>
          </div>
        )}
      </div>

      {/* Botões de Ação na Base */}
      <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
        <button
          onClick={onClearDeck}
          disabled={deck.length === 0}
          className="w-full py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Limpar Tudo
        </button>

        <button
          disabled={!isDeckValid}
          className="w-full py-2.5 rounded-lg bg-amber-500 font-bold text-sm text-black hover:bg-amber-400 transition-all cursor-pointer disabled:opacity-30 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed shadow-lg shadow-amber-500/5"
        >
          Salvar Deck
        </button>
      </div>
    </div>
  );
}
