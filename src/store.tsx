import { create } from "zustand";

interface SelectPokemonType {
  index: number;
  name: string;
  krName: string;
}

interface StoreType {
  relaseImgIndex: number;
  relaseKrNameIndex: number;
  selectPokemon: SelectPokemonType | null;
  setRelaseImgIndex: (select: number) => void;
  setRelaseKrNameIndex: (select: number) => void;
  setSelectPokemon: (select: SelectPokemonType) => void;
}

const useStore = create<StoreType>((set) => ({
  relaseImgIndex: Infinity,
  relaseKrNameIndex: Infinity,
  selectPokemon: null,
  setRelaseImgIndex: (select) => {
    set(() => ({ relaseImgIndex: select }));
  },
  setRelaseKrNameIndex: (select) => {
    set(() => ({ relaseKrNameIndex: select }));
  },
  setSelectPokemon: (select) => {
    set(() => ({ selectPokemon: select }));
  },
}));

export default useStore;
