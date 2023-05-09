import { useState, useEffect } from "react";

function Hello({ keyword, counter }) {
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);

  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);

  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);

  useEffect(() => {
    console.log("I run when keyword & counter change");
  }, [keyword, counter]);

  return <h1>Hello</h1>;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);

  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {
    console.log("I run only once.");
    return () => {
      console.log("bye :(");
    };
  }, []);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
      <button onClick={() => setShowing((prev) => !prev)}>
        {showing ? "Hide" : "Show"}
      </button>
      {showing ? <Hello keyword={keyword} counter={counter} /> : null}
    </div>
  );
}

export default App;
