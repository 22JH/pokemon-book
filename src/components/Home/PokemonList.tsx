/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useInfiniteQuery } from "react-query";
import { getPokemons } from "../../hooks/useApi";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ResultType,
  PagesType,
  pokemonType,
} from "../../types/PokemonListType";
import useIntersectionObserver from "../../hooks/useIntersectionObeserver";
import Pokemon from "./Pokemon";
import { LIMIT } from "../..//hooks/useApi";
import Loading from "../Loading";

const pokemonListContainer = css`
  height: auto;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;

  .target {
    position: absolute;
    width: 100%;
    height: 5vh;
    bottom: 0;
    border: 1px solid black;
  }
`;

const pokemonImgUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

const PokemonList = () => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const observeTarget = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "get-pokemons",
    getPokemons,
    {
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage.data.next;
        return nextUrl || undefined;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      select: (res) => {
        const newPages = res.pages.map((page: AxiosResponse, pageIdx) => {
          const pokemons: PagesType = page.data.results.map(
            (result: ResultType, nowPageIdx: number) => {
              const pokemonIdx = LIMIT * pageIdx + nowPageIdx + 1;
              const pokemonInfo = {
                name: result.name,
                image: `${pokemonImgUrl}${pokemonIdx}.png`,
                index: pokemonIdx,
              };
              return pokemonInfo;
            }
          );
          return {
            ...page,
            data: {
              ...page.data,
              results: pokemons,
            },
          };
        });
        return { pages: newPages, pageParams: res.pageParams };
      },
    }
  );

  const [observe, unobserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  useEffect(() => {
    if (hasNextPage && observeTarget.current) {
      observe(observeTarget.current);
    } else if (!hasNextPage && observeTarget.current) {
      unobserve(observeTarget.current);
    }
  }, [hasNextPage, observe, unobserve, data]);

  useEffect(() => {
    const lastPage = data?.pages[data.pages.length - 1];
    if (lastPage && !lastPage.data.next) {
      setHasNextPage(false);
    }
  }, [data]);
  return (
    <div css={pokemonListContainer}>
      {data
        ? data.pages.map((page) =>
            page.data.results.map((pokemon: pokemonType) => (
              <Pokemon
                name={pokemon.name}
                imgUrl={pokemon.image}
                index={pokemon.index}
                key={pokemon.name}
              />
            ))
          )
        : Array.from({ length: LIMIT }).map((_, i) => (
            <Pokemon name="loading" imgUrl="./logo192.png" index={i} key={i} />
          ))}
      <div className="target" ref={observeTarget} />
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default React.memo(PokemonList);
