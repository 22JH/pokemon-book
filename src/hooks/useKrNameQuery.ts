import { useQuery } from "react-query";
import { getSpecies } from "../hooks/useApi";
import { AxiosError } from "axios";
import useStore from "../store";

interface LanguageType {
  name: string;
}

interface NameInfoType {
  language: LanguageType;
}

export function useKrNameQuery(index: number) {
  const { relaseKrNameIndex, setRelaseKrNameIndex } = useStore();
  return useQuery(["pokemonSpecies", index], () => getSpecies(index), {
    staleTime: Infinity,
    select: (res) => {
      const nameInfo = res.data.names.filter((info: NameInfoType) => {
        return info.language.name === "ko";
      });
      return nameInfo[0]?.name;
    },
    enabled: relaseKrNameIndex > index && index > 0,
    onError: (err: AxiosError) => {
      if (err?.response?.status === 404) {
        setRelaseKrNameIndex(index);
      }
    },
    retry: (_, error) => {
      if ((error as AxiosError)?.response?.status === 404) return false;
      else return true;
    },
    refetchOnWindowFocus: false,
  });
}
