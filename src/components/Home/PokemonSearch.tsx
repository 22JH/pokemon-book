import { useState } from "react";

interface PropType {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  renderList: boolean;
  setRenderList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PokemonSearch({
  setIndex,
  setRenderList,
  renderList,
}: PropType) {
  const [searchNumber, setSearchNumber] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumber = inputValue.replace(/[^0-9]/g, "");
    setSearchNumber(onlyNumber);
  };
  const handleClick = () => {
    /** 캐싱을 위해 쿼리 키에 searchNumber을 이용했지만 이로인해 input focus에서 벗어나면 useQuery가 실행되는 문제가 생김
     * 이를 해결하기 위해 변수 하나를 더 만들어서 button이 클릭 시에 바뀌게 함
     */
    setIndex(Number(searchNumber));
    setRenderList(false);
  };

  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="번호 검색"
        onChange={handleSearch}
        value={searchNumber}
      />
      <button onClick={handleClick}>검색</button>
      {!renderList && (
        <button onClick={() => setRenderList(true)}>전체보기</button>
      )}
    </div>
  );
}
