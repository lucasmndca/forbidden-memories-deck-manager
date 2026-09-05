import { YugiohFMCard } from '@/types/card';

interface DeckRowProps {
  card: YugiohFMCard;
  quantity: number;
  onRemove: (id: number) => void;
}

export function DeckRow({ card, quantity, onRemove }: DeckRowProps) {
    // Define a cor do papel do card de acordo com o tipo
  const getCardColorClass = () => {
    switch (card.type) {
      case 'Magic':
      case 'Equip':
        return 'bg-emerald-600 border-emerald-500';
      case 'Trap':
        return 'bg-rose-600 border-rose-500';
      case 'Ritual':
        return 'bg-blue-600 border-blue-500';
      default:
        // Monstros (Dragon, Warrior, Spellcaster, etc.)
        return 'bg-amber-600 border-amber-500';
    }
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        {/* Ícone de Card (Retângulo vertical com quadrado interno escuro) */}
        <div className={`flex-shrink-0 w-5 h-7 rounded-sm border p-0.5 flex flex-col justify-start items-center shadow-md ${getCardColorClass()}`}>
          {/* Espaço para a "imagem" do card */}
          <div className="w-full h-3.5 bg-neutral-950/80 rounded-[1px]" />
        </div>
        
        {/* Quantidade em destaque */}
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">
          {quantity}x
        </span>
        {/* Nome da carta comprimido para caber na barra lateral */}
        <span className="text-sm font-medium text-neutral-200 truncate">
          {card.name}
        </span>
      </div>

      {/* Botão de remover uma cópia */}
      <button
        onClick={() => onRemove(card.id)}
        className="text-neutral-500 hover:text-rose-400 p-1 text-xs font-mono rounded hover:bg-rose-500/10 transition-all cursor-pointer shrink-0"
        title="Remover uma cópia"
      >
        [ REMOVER ]
      </button>
    </div>
  );
}
