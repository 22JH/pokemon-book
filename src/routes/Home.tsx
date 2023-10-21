/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { getSpecies } from "../hooks/useApi";
import { Suspense, useState } from "react";
import Pokemon from "../components/Home/Pokemon";
import { lazy } from "react";
import Loading from "../components/Loading";
import PokemonSearch from "../components/Home/PokemonSearch";

const homeContainer = css`
  width: 100vw;
  height: auto;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  .search-section {
    display: flex;
    padding: 30px;
  }
`;

const pokemonImgUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export default function Home() {
  const PokemonList = lazy(() => import("../components/Home/PokemonList"));
  const [index, setIndex] = useState<number>(0);
  const [renderList, setRenderList] = useState<boolean>(true);
  const { data, isLoading, isError } = useQuery(
    ["pokemonSpecies", index],
    () => getSpecies(index),
    {
      enabled: !!index,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      select: (res) => res.data,
      retry: false,
    }
  );

  return (
    <div css={homeContainer}>
      <div className="search-section">
        <PokemonSearch
          setIndex={setIndex}
          renderList={renderList}
          setRenderList={setRenderList}
        />
      </div>
      {renderList ? (
        <Suspense fallback={<Loading />}>
          <PokemonList />
        </Suspense>
      ) : isLoading ? (
        <div>검색 중...</div>
      ) : isError ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <Pokemon
          index={index}
          imgUrl={`${pokemonImgUrl}${index}.png`}
          name={data?.name}
        />
      )}
    </div>
  );
}
