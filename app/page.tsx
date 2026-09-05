'use client';

import { useDeck } from '@/hooks/useDeck';
import { CardGrid } from '@/components/CardGrid';
import { DeckPanel } from '@/components/DeckPanel';
import { AlertModal } from '@/components/AlertModal';

export default function Home() {
  const { deck, totalCards, isDeckValid, modal, closeModal, addCard, removeCard, clearDeck } = useDeck();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Container Centralizado */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Cabeçalho Principal da Aplicação */}
        <header className="mb-8 md:mb-12 border-b border-neutral-900 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-xs font-mono tracking-widest text-amber-500 font-bold uppercase">PS1 Retro Utility</p>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Yu-Gi-Oh! FM Deck Builder
            </h1>
          </div>
          <p className="text-xs text-neutral-500 md:text-right font-mono max-w-xs">
            Construa e valide sua estratégia seguindo as regras clássicas de 1999.
          </p>
        </header>

        {/* Grid de Duas Colunas Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Coluna da Esquerda: Catálogo e Filtros (Ocupa 3 de 4 colunas no desktop) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4 font-mono">
              Catálogo de Cartas
            </h2>
            <CardGrid onAddCard={addCard} />
          </div>

          {/* Coluna da Direita: Painel de Gerenciamento do Deck (Ocupa 1 de 4 colunas) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <DeckPanel
              deck={deck}
              totalCards={totalCards}
              isDeckValid={isDeckValid}
              onRemoveCard={removeCard}
              onClearDeck={clearDeck}
            />
          </div>

        </div>

      </div>

      <AlertModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </main>
  );
}
