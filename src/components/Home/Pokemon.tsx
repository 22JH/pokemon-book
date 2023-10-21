/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useKrNameQuery } from "../../hooks/useKrNameQuery";
import useStore from "../../store";
import { useState } from "react";

const pokemonContainer = css`
  width: 20vw;
  height: auto;
  border: 3px solid black;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
  img {
    border: 1px solid black;
    border-radius: 10px;
    margin: 5px;
    width: 15vw;
    height: auto;
  }
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
`;

interface PropType {
  name: string;
  imgUrl: string;
  index: number;
}

export default function Pokemon({ name, imgUrl, index }: PropType) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { relaseImgIndex, setRelaseImgIndex } = useStore();

  const krName = useKrNameQuery(index);

  const pokemonClickHandle = () => {
    navigate(`/detail/${index}`);
  };
  return (
    <div css={pokemonContainer} onClick={pokemonClickHandle}>
      <img
        src={
          isLoading
            ? "./logo192.png"
            : index < relaseImgIndex
            ? imgUrl
            : "./logo192.png"
        }
        alt={name}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setRelaseImgIndex(index);
          const target = e.target as HTMLImageElement;
          target.src = "./logo192.png";
        }}
        loading="lazy"
      />
      <p>No.{index}</p>
      <p>Name : {name}</p>
      {krName.data && <p>Name(kr) : {krName.data}</p>}
    </div>
  );
}
