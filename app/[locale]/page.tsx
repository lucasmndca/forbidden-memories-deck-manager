'use client';

import { useDeck } from '@/hooks/useDeck';
import { CardGrid } from '@/components/CardGrid';
import { DeckPanel } from '@/components/DeckPanel';
import { AlertModal } from '@/components/AlertModal';
import { Header } from '@/components/Header';

export default function Home() {
  const { deck, totalCards, isDeckValid, modal, closeModal, addCard, removeCard, clearDeck } = useDeck();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Container Centralizado */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Cabeçalho Principal da Aplicação */}
        <Header />

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
