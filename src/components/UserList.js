import React, { useContext } from "react";
import { UserDispatch } from "../App";

function User({ user }) {
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{ color: user.active ? "green" : "black", cursor: "pointer" }}
        onClick={() => dispatch({ type: "TOGGLE_USER", id: user.id })}
      >
        {user.username}
      </b>{" "}
      <span>{user.email}</span>
      <button
        onClick={() =>
          dispatch({
            type: "MODIFY_USER",
            username: user.username,
            email: user.email,
            id: user.id,
          })
        }
      >
        수정
      </button>
      <button onClick={() => dispatch({ type: "REMOVE_USER", id: user.id })}>
        삭제
      </button>
    </div>
  );
}

export default function UserList({ users }) {
  const userlist = users.map((el) => <User key={el.id} user={el} />);
  return <>{userlist}</>;
}
