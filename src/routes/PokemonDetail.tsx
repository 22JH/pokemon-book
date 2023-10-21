/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery } from "react-query";
import { getPokemonDetail } from "../hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import PokemonImages from "../components/PokemonDetail/PokemonImages";
import PokemonExplain from "../components/PokemonDetail/PokemonExplain";
import Loading from "../components/Loading";

const pokemonDetailContainer = css`
  width: 100vw;
  height: 100vh;
  .home-button {
    width: 70px;
    height: 70px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .detail-box {
    width: 80%;
    height: 90%;
    display: flex;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .explainSection {
      border: 1px solid black;
      flex: 1;
      height: 80%;
    }
    .imageSection {
      border: 1px solid black;
      flex: 0.7;
      height: 80%;
      overflow: scroll;
    }
  }
`;

export default function PokemonDetail() {
  const params = useParams();
  const index = Number(params.id);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    ["get-pokemon-detail", index],
    () => getPokemonDetail(index),
    {
      select: (res) => res.data,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const handleHomeButton = () => {
    navigate("/");
  };
  return (
    <div css={pokemonDetailContainer}>
      <div className="home-button" onClick={handleHomeButton}>
        홈으로
      </div>
      <div className="detail-box">
        <div className="imageSection">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div>"정보가 없습니다"</div>
          ) : (
            <PokemonImages index={index} data={data} />
          )}
        </div>
        <div className="explainSection">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div>"정보가 없습니다"</div>
          ) : (
            <PokemonExplain index={index} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
