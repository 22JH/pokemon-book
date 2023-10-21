import axios from "axios";

export const LIMIT = 20;
const initalUrl = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=0`;
export const getPokemons = async ({ pageParam = initalUrl }) => {
  return axios.get(pageParam);
};

export const getSpecies = async (pokemonIdx: number) => {
  const getKrNameUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIdx}`;
  return axios.get(getKrNameUrl);
};

export const getPokemonDetail = async (pokemonIdx: number | undefined) => {
  const getPokemonDetail = `https://pokeapi.co/api/v2/pokemon/${pokemonIdx}`;
  return axios.get(getPokemonDetail);
};

export const getEvolutionData = async (evolutionUrl: string | null) => {
  if (evolutionUrl) return axios.get(evolutionUrl);
};
