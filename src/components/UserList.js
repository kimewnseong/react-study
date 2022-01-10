import React from "react";

function User({ user, onRemove }) {
  return (
    <div>
      <b>{user.username}</b> <span>{user.email}</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

export default function UserList({ users, onRemove }) {
  const userlist = users.map((el) => (
    <User key={el.id} user={el} onRemove={onRemove} />
  ));

  return <>{userlist}</>;
}
