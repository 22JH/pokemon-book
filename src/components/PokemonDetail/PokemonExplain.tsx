/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useKrNameQuery } from "../../hooks/useKrNameQuery";
import PokemonsType from "../../types/PokemonsType";
import PokemonEvolution from "./PokemonEvolution";

const pokemonExplainContainer = css`
  width: 100%;
  height: 100%;
  .type {
    display: flex;
    align-items: center;
  }
`;

interface PropType {
  index: number;
  data: PokemonsType;
}

interface TypeType {
  name: string;
}

interface TypeInfoType {
  type: TypeType;
}

export default function PokemonExplain({ index, data }: PropType) {
  const krName = useKrNameQuery(index);

  return (
    <div css={pokemonExplainContainer}>
      <h1>
        {data?.name}({krName.data})
      </h1>
      <p>키 : {data?.height / 10}m</p>
      <p>몸무게 : {data?.weight / 10}kg</p>
      <div className="type">
        <p>타입 : &nbsp;</p>
        {data?.types.map((typeInfo: TypeInfoType) => {
          return <p key={typeInfo.type.name}>{typeInfo.type.name}&nbsp; </p>;
        })}
      </div>
      <div className="evolution">
        <PokemonEvolution index={index} name={data?.name} />
      </div>
    </div>
  );
}
