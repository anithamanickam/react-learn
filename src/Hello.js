import React from "react";
import { useState } from "react";

const Hello = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  return (
    <>
      <div>Hello</div>
      <input
        type={"text"}
        placeholder={"enter text"}
        defaultValue={"Anitha"}
      ></input>
      {/* counter */}

      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <input
        type={"number"}
        value={num}
        onChange={(e) => setNum(e.target.value)}
      ></input>
    </>
  );
};

export default Hello;
