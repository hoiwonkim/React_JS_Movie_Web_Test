import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState(""); // 할 일을 담을 state
  const [toDos, setToDos] = useState([]); // 할 일 목록을 담을 state
  const onChange = (event) => setToDo(event.target.value); // input 값이 변경될 때마다 실행되는 함수
  const onSubmit = (event) => {
    // form이 제출될 때 실행되는 함수
    event.preventDefault(); // 기본 동작 방지
    if (toDo === "") {
      // 할 일이 입력되지 않았을 경우
      return; // 함수 종료
    }
    setToDos((currentArray) => [toDo, ...currentArray]); // 할 일 목록에 새로운 할 일 추가
    setToDo(""); // input 값 초기화
  };
  console.log(toDos); // 할 일 목록 출력
  console.log(toDos.map((item, index) => <li key={index}>{item}</li>)); // 할 일 목록을 li 태그로 변환하여 출력
  const [loading, setLoading] = useState(true); // API 요청 중인지 여부를 담을 state
  const [coins, setCoins] = useState([]); // API 요청 결과를 담을 state
  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되는 함수
    fetch("https://api.coinpaprika.com/v1/tickers") // API 요청
      .then((response) => response.json()) // 응답을 json 형태로 변환
      .then((json) => {
        setCoins(json); // API 요청 결과를 state에 저장
        setLoading(false); // API 요청 완료
      });
  }, []);
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
// App.js 파일에서 App 컴포넌트를 export합니다.
// 이 컴포넌트는 애플리케이션의 루트 컴포넌트입니다.
// 다른 컴포넌트들을 이 컴포넌트 안에서 렌더링합니다.
export default App;
