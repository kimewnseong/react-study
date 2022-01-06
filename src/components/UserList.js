import React from "react";

function User(props) {
  return (
    <div>
      <b>{props.user.username}</b> <span>{props.user.email}</span>
    </div>
  );
}

export default function UserList() {
  const users = [
    {
      id: 1,
      username: "Bob",
      email: "bob@naver.com",
    },
    {
      id: 2,
      username: "Chris",
      email: "chris@naver.com",
    },
    {
      id: 3,
      username: "Jay",
      email: "jay@naver.com",
    },
  ];

  const userlist = users.map((el) => <User key={el.id} user={el} />);

  return <>{userlist}</>;
}
