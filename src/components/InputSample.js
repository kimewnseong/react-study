import React, { useState } from "react";

function InputSample() {
  const [inputValue, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const resetHandler = (e) => {
    setInput("");
  };

  return (
    <>
      <input value={inputValue} placeholder="이름" onChange={inputHandler} />
      <button onClick={resetHandler}>초기화</button>
      <p>이름: {inputValue}</p>
    </>
  );
}

export default InputSample;
