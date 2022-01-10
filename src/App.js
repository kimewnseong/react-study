import React, { useState, useRef } from "react";
import UserList from "./components/UserList";
import CreateUser from "./CreateUser";

function App() {
  // 추가 될 값 설정
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const { username, email } = userInfo;

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setUserInfo((current) => {
      const newUser = { ...current };
      newUser[name] = value;
      return newUser;
    });
  };

  const [users, setUsers] = useState([
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
  ]);

  // 유저 추가하기
  const nextId = useRef(4);

  const createUser = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    setUsers((current) => {
      const newUsers = [...current];
      newUsers.push(user);
      return newUsers;
    });

    // input 비워주기
    setUserInfo({
      username: "",
      email: "",
    });

    // 다음 만들어질 user의 id를 위해 nextId에 1추가
    nextId.current += 1;
  };

  // 유저 삭제
  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={changeHandler}
        onCreate={createUser}
      />
      <UserList users={users} onRemove={removeUser} />
    </>
  );
}

export default App;
