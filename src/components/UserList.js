import React from "react";

function User({ user, onRemove, onToggle, onModify }) {
  return (
    <div>
      <b
        style={{ color: user.active ? "green" : "black", cursor: "pointer" }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>{" "}
      <span>{user.email}</span>
      <button onClick={() => onModify(user)}>수정</button>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

export default function UserList({ users, onRemove, onToggle, onModify }) {
  const userlist = users.map((el) => (
    <User
      key={el.id}
      user={el}
      onRemove={onRemove}
      onToggle={onToggle}
      onModify={onModify}
    />
  ));
  return <>{userlist}</>;
}
