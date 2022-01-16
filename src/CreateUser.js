import React, { useRef, useContext } from "react";
import { UserDispatch } from "./App";

function CreateUser({ username, email }) {
  const nextId = useRef(4);
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <input
        value={username}
        name="username"
        placeholder="닉네임"
        onChange={(e) => {
          const { name, value } = e.target;
          dispatch({ type: "CHANGE_INPUT", name, value });
        }}
      />
      <input
        value={email}
        name="email"
        placeholder="이메일"
        onChange={(e) => {
          const { name, value } = e.target;
          dispatch({ type: "CHANGE_INPUT", name, value });
        }}
      />
      <button
        onClick={() => {
          dispatch({
            type: "CREATE_USER",
            user: {
              id: nextId.current,
              username,
              email,
            },
          });
          nextId.current++;
        }}
      >
        등록
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "UPDATE_USER",
          });
        }}
      >
        업데이트
      </button>
    </div>
  );
}

export default CreateUser;
