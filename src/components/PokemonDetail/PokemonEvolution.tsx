/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getEvolutionData, getSpecies } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { SpeciesType } from "../../types/SpeciesType";
import ImageLazyLoading from "../ImageLazyLoading";

const PokemonEvolutionContainer = css`
  .evolution-list {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    .evolution-pokemon {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .evolution-img {
        flex: 5;
        img {
          width: 5rem;
          height: 5rem;
        }
      }
      .evolution-name {
        flex: 1;
      }
    }
  }
`;

interface PropType {
  index: number;
  name: string;
}

interface evolutionType {
  name: string;
  url: number;
}

const pokemonImgUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

function extractEvolutionData(
  chain: SpeciesType
): Array<{ name: string; url: number }> {
  const url = chain.species.url;
  const urlSplit = url.split("/");
  const index = Number(urlSplit[urlSplit.length - 2]);
  let result = [
    {
      name: chain.species.name,
      url: index,
    },
  ];

  if (chain.evolves_to.length > 0 && chain.evolves_to[0] !== undefined) {
    result = result.concat(extractEvolutionData(chain.evolves_to[0]));
  }

  return result;
}

export default function PokemonEvolution({ index, name }: PropType) {
  const [evolutionUrl, setEvolutionUrl] = useState<string>("");
  const [evolutionChainData, setEvolutionChainData] = useState<evolutionType[]>(
    []
  );

  const navigate = useNavigate();

  useQuery(["pokemonSpecies", index], () => getSpecies(index), {
    onSuccess: (res) => setEvolutionUrl(res.data.evolution_chain?.url),
    refetchOnWindowFocus: false,
  });

  useQuery(
    ["get-evolution", evolutionUrl],
    () => getEvolutionData(evolutionUrl),
    {
      select: (res) => res?.data.chain,
      onSuccess: (res) => {
        const chainData = extractEvolutionData(res);
        setEvolutionChainData(chainData);
      },
      refetchOnWindowFocus: false,
      enabled: !!evolutionUrl,
    }
  );

  const handleImgClick = (index: number) => {
    navigate(`/detail/${index}`);
  };
  return (
    <div css={PokemonEvolutionContainer}>
      <h1>진화 정보</h1>
      <div className="evolution-list">
        {evolutionChainData?.map((evolutionInfo: evolutionType) => {
          const imgUrl = `${pokemonImgUrl}/${evolutionInfo.url}.png`;
          return (
            <div
              className="evolution-pokemon"
              css={{
                border: evolutionInfo.name === name ? "1px dotted black" : "",
              }}
              onClick={() => handleImgClick(evolutionInfo.url)}
              key={evolutionInfo.name}
            >
              <div className="evolution-img">
                <ImageLazyLoading
                  dataCheck={!!evolutionInfo}
                  url={imgUrl}
                  alt={evolutionInfo.name}
                />
              </div>
              <div className="evolution-name">{evolutionInfo.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
