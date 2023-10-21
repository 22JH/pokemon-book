/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useStore from "../../store";
import PokemonsType from "../../types/PokemonsType";
import { useEffect, useState } from "react";

const PokemonImagesContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .current-img {
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 10rem;
      height: 10rem;
    }
  }
  .img-list {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 0 10px;
  }
`;

interface PropType {
  index: number;
  data: PokemonsType | undefined;
}

export default function PokemonImages({ index, data }: PropType) {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const { relaseImgIndex } = useStore();
  const pokemonImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;

  useEffect(() => {
    let urls: string[] = [];
    for (const url in data?.sprites) {
      const spriteUrl = data?.sprites[url];
      if (spriteUrl !== null && typeof spriteUrl === "string") {
        urls.push(spriteUrl);
      }
    }
    setImgUrls(urls);
  }, [data]);

  return (
    <div css={PokemonImagesContainer}>
      <div className="current-img">
        <img
          src={index < relaseImgIndex ? pokemonImgUrl : "./logo192.png"}
          alt="pokemon-img"
        />
      </div>
      <div className="img-list">
        {imgUrls?.map((ele: string) => {
          return <img src={ele} alt={ele} key={ele} />;
        })}
      </div>
    </div>
  );
}
