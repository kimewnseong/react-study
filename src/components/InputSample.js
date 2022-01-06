import React, { useState, useRef } from "react";

function InputSample() {
  const [inputValue, setInput] = useState({
    name: "",
    nickname: "",
  });

  const nameFocus = useRef();

  const { name, nickname } = inputValue;

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInput((current) => {
      const newInput = { ...current };
      newInput[name] = value;
      return newInput;
    });
  };

  const resetHandler = () => {
    setInput({
      name: "",
      nickname: "",
    });
    nameFocus.current.focus();
  };

  return (
    <>
      <input
        value={name}
        name="name"
        placeholder="이름"
        onChange={inputHandler}
        ref={nameFocus}
      />
      <input
        value={nickname}
        name="nickname"
        placeholder="닉네임"
        onChange={inputHandler}
      />
      <button onClick={resetHandler}>초기화</button>
      <div>
        <p>이름: {name}</p>
        <p>닉네임: {nickname}</p>
      </div>
    </>
  );
}

export default InputSample;
