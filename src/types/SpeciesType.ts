interface SpecieType {
  url: string;
  name: string;
}

export interface SpeciesType {
  species: SpecieType;
  evolves_to: SpeciesType[];
}
