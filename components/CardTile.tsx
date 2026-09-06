import { YugiohFMCard } from '@/types/card';
import { useTranslations } from 'next-intl';
import { LuArrowRight } from 'react-icons/lu';
import { StarChip } from './StarChip';

interface CardTileProps {
  card: YugiohFMCard;
  onAdd: (card: YugiohFMCard) => void;
}

export function CardTile({ card, onAdd }: CardTileProps) {
  const t = useTranslations('Catalog');

  const isMonster = card.atk !== null && card.def !== null;

  return (
    <div className="flex flex-col justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-amber-500/50 transition-all group">
      <div>
        {/* Cabeçalho da Carta */}
        <div className="flex justify-between items-start gap-2">
          <span className="text-xs font-mono text-neutral-500">#{String(card.id).padStart(3, '0')}</span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${card.type === 'Magic' ? 'bg-green-950 text-green-400' :
            card.type === 'Trap' ? 'bg-rose-950 text-rose-400' :
              card.type === 'Equip' ? 'bg-cyan-950 text-cyan-400' :
                card.type === 'Ritual' ? 'bg-blue-950 text-blue-400' :
                  'bg-amber-950 text-amber-400'
            }`}>
            {card.type}
          </span>
        </div>

        {/* Nome da Carta */}
        <h3 className="mt-2 font-bold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1">
          {card.name}
        </h3>

        {/* Status de Monstros */}
        {isMonster ? (
          <div className="mt-3 flex items-center gap-3 text-xs font-mono text-neutral-400">
            <div><span className="text-neutral-600">ATK/</span>{card.atk}</div>
            <div><span className="text-neutral-600">DEF/</span>{card.def}</div>
            <div className='flex items-center gap-1'>
              <StarChip />
              x{card.level}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-xs text-neutral-400 line-clamp-2 italic h-8">
            {card.description}
          </p>
        )}
      </div>

      {/* Botão de Adicionar */}
      <button
        onClick={() => onAdd(card)}
        className="mt-4 w-full py-2 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-black font-semibold text-sm transition-all cursor-pointer flex justify-center gap-2 items-center"
      >
        <span>{t('addBtn')}</span>
        <LuArrowRight />
      </button>
    </div>
  );
}
