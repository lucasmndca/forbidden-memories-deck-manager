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
}
