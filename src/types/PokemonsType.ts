interface PokemonSprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  [key: string]: string | null;
}

interface PokemonDetailtype {
  name: string;
  url: string;
}

interface Pokemonstpye {
  slot: number;
  type: PokemonDetailtype;
}

export default interface PokemonDataType {
  sprites: PokemonSprite;
  name: string;
  height: number;
  weight: number;
  types: Pokemonstpye[];
}
