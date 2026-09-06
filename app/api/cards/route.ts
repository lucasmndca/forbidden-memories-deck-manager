import { NextResponse } from 'next/server';
import rawCards from '@/data/cards.json';
import { TYPE_MAP } from '@/types/card';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const type = searchParams.get('type') || '';

  // O filtro pesado agora acontece de forma ultra rápida no servidor da Vercel
  const filtered = (rawCards as any[]).filter((c) => {
    const cardTypeStr = TYPE_MAP[c.Type] || 'Magic';
    
    const matchesSearch = c.Name.toLowerCase().includes(search);
    const matchesType = type ? cardTypeStr === type : true;
    
    return matchesSearch && matchesType;
  });

  // PERFORMANCE: Retorna apenas o lote necessário (ex: as primeiras 15 cartas)
  const paginatedCards = filtered.slice(0, 15);

  return NextResponse.json({
    cards: paginatedCards,
    totalFound: paginatedCards.length,
    totalDataset: (rawCards as any[]).length
  });
}
