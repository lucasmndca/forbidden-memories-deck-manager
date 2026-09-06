export type GuardianStar = 

  | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' 
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';

export type CardType = 

  | 'Dragon' | 'Spellcaster' | 'Zombie' | 'Warrior' | 'Beast-Warrior' 
  | 'Beast' | 'Winged Beast' | 'Fiend' | 'Fairie' | 'Insect' 
  | 'Dinosaur' | 'Reptile' | 'Fish' | 'Sea Serpent' | 'Machine' 
  | 'Thunder' | 'Aqua' | 'Pyro' | 'Rock' | 'Plant'
  | 'Magic' | 'Trap' | 'Equip' | 'Ritual';

export interface YugiohFMCard {
  id: number;              // De 1 a 722 (Identificador oficial do jogo)
  name: string;            // Nome em inglês (ex: "Blue-Eyes White Dragon")
  type: CardType;          // Tipo da carta
  atk: number | null;      // Cartas de mágica/armadilha não possuem ATK (null)
  def: number | null;      // Cartas de mágica/armadilha não possuem DEF (null)
  guardianStars: [GuardianStar, GuardianStar] | null; // Sempre duas para monstros
  password: string;        // Código de 8 dígitos para comprar no Password menu
  starChips: number;       // Custo em Star Chips no jogo original (ex: 999999)
  description: string;     // Texto descritivo da carta no jogo
  level?: number;          // Quantidade de estrelas na carta
}

// 1. Mapeamento oficial dos IDs de Tipo do Forbidden Memories
export const TYPE_MAP: Record<number, CardType> = {
  0: 'Dragon', 1: 'Spellcaster', 2: 'Zombie', 3: 'Warrior', 4: 'Beast-Warrior',
  5: 'Beast', 6: 'Winged Beast', 7: 'Fiend', 8: 'Fairie', 9: 'Insect',
  10: 'Dinosaur', 11: 'Reptile', 12: 'Fish', 13: 'Sea Serpent', 14: 'Machine',
  15: 'Thunder', 16: 'Aqua', 17: 'Pyro', 18: 'Rock', 19: 'Plant',
  20: 'Magic', 21: 'Trap', 22: 'Ritual', 23: 'Equip'
} as const;

// 2. Mapeamento oficial das Estrelas Guardiãs
export const STAR_MAP: Record<number, GuardianStar> = {
  0: 'Sun', 1: 'Moon', 2: 'Mercury', 3: 'Venus', 4: 'Mars',
  5: 'Jupiter', 6: 'Saturn', 7: 'Uranus', 8: 'Neptune', 9: 'Pluto'
} as const;
