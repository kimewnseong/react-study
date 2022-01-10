import React, { useEffect } from "react";

function User({ user, onRemove, onToggle, onModify }) {
  // deps를 [] (빈 배열)로 두거나 생략하거나 props/ 상태를 주시해야할 때를 생각하면서 사용하자.
  useEffect(() => {
    console.log("user생성");
    console.log(user);
    return () => {
      console.log("user 바뀌기 전");
      console.log(user);
    };
  }, [user]);

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
