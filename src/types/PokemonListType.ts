interface ResultsType {
  name: string;
  url: string;
}

interface DataType {
  results: ResultsType[];
}
export interface ResultType {
  name: string;
}

export interface PagesType {
  data: DataType;
}

export interface pokemonType {
  name: string;
  image: string;
  index: number;
}
