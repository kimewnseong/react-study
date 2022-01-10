import React, { useState, useRef, useMemo, useCallback } from "react";
import UserList from "./components/UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}
function App() {
  // 추가 될 값 설정
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    id: "",
  });

  // 업데이트 시 id를 찾기 위해 id 추가
  const { username, email, id } = userInfo;

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
      active: true,
    },
    {
      id: 2,
      username: "Chris",
      email: "chris@naver.com",
      active: false,
    },
    {
      id: 3,
      username: "Jay",
      email: "jay@naver.com",
      active: false,
    },
  ]);

  // 유저 추가하기
  const nextId = useRef(4);

  const createUser = useCallback(() => {
    const user = {
      id: nextId.current,
      username: username,
      email: email,
    };

    setUsers([...users, user]);

    // input 비워주기
    setUserInfo({
      username: "",
      email: "",
    });

    // 다음 만들어질 user의 id를 위해 nextId에 1추가
    nextId.current += 1;
  }, [users, username, email]); //deps에 nextId를 넣지 않은 이유는 useRef로 선언했기 때문

  // 유저 삭제
  const removeUser = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  // 유저 업데이트
  const updateUser = useCallback(() => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, username: username, email: email } : user
      )
    );

    setUserInfo({
      username: "",
      email: "",
      id: "",
    });
  }, [users, username, email, id]);

  const modifyUser = useCallback((user) => {
    setUserInfo({
      username: user.username,
      email: user.email,
      id: user.id,
    });
  }, []);

  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={changeHandler}
        onCreate={createUser}
        onUpdate={updateUser}
      />
      <UserList
        users={users}
        onRemove={removeUser}
        onToggle={onToggle}
        onModify={modifyUser}
      />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
