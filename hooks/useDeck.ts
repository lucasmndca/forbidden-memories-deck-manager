import { useState, useCallback } from 'react';
import { YugiohFMCard } from '@/types/card';
import { useTranslations } from 'next-intl';

export interface DeckItem {
  card: YugiohFMCard;
  quantity: number;
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

export function useDeck() {
  const t = useTranslations('Errors');
  const [deck, setDeck] = useState<DeckItem[]>([]);
  
  // Estado para controlar o Modal customizado
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: ''
  });

  const totalCards = deck.reduce((acc, item) => acc + item.quantity, 0);

  const addCard = useCallback((card: YugiohFMCard) => {
    setDeck((currentDeck) => {
      // Substituído alert por estado do modal
      if (totalCards >= 40) {
        setModal({
          isOpen: true,
          title: t('limitTitle'),
          message: t('limitMessage')
        });
        return currentDeck;
      }

      const existingItemIndex = currentDeck.findIndex(item => item.card.id === card.id);

      if (existingItemIndex > -1) {
        // Substituído alert por estado do modal
        if (currentDeck[existingItemIndex].quantity >= 3) {
          setModal({
            isOpen: true,
            title: t('copiesTitle'),
            message: t('copiesMessage', {name: card.name})
          });
          return currentDeck;
        }

        const newDeck = [...currentDeck];
        newDeck[existingItemIndex] = {
          ...newDeck[existingItemIndex],
          quantity: newDeck[existingItemIndex].quantity + 1
        };
        return newDeck;
      }

      return [...currentDeck, { card, quantity: 1 }];
    });
  }, [totalCards]);

  const removeCard = useCallback((cardId: number) => {
    setDeck((currentDeck) => {
      const existingItemIndex = currentDeck.findIndex(item => item.card.id === cardId);
      if (existingItemIndex === -1) return currentDeck;

      const newDeck = [...currentDeck];
      const currentItem = newDeck[existingItemIndex];

      if (currentItem.quantity > 1) {
        newDeck[existingItemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity - 1
        };
        return newDeck;
      } else {
        return newDeck.filter(item => item.card.id !== cardId);
      }
    });
  }, []);

  const clearDeck = useCallback(() => {
    setDeck([]);
  }, []);

  // Função para fechar o modal limpando seu estado
  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const isDeckValid = totalCards === 40;

  return {
    deck,
    totalCards,
    isDeckValid,
    modal, // Expondo o estado do modal
    addCard,
    removeCard,
    clearDeck,
    closeModal // Expondo a função de fechar
  };
}
