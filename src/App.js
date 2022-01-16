import React, { useReducer, useRef, useMemo, useCallback } from "react";
import UserList from "./components/UserList";
import CreateUser from "./CreateUser";

const countActiveUsers = (users) => {
  return users.filter((user) => user.active).length;
};

const initialState = {
  inputs: {
    username: "",
    email: "",
    id: "",
  },

  users: [
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
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    }

    case "CREATE_USER": {
      return {
        users: [...state.users, action.user],
        // input 비워주기
        inputs: {
          username: "",
          email: "",
        },
      };
    }

    case "TOGGLE_USER": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    }

    case "REMOVE_USER": {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    }
    case "MODIFY_USER": {
      return {
        ...state,
        inputs: {
          username: action.username,
          email: action.email,
          id: action.id,
        },
      };
    }

    case "UPDATE_USER": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === state.inputs.id
            ? {
                ...user,
                username: state.inputs.username,
                email: state.inputs.email,
              }
            : user
        ),
      };
    }

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { username, email } = state.inputs;
  const { users } = state;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const onModify = useCallback(({ username, email, id }) => {
    dispatch({
      type: "MODIFY_USER",
      username,
      email,
      id,
    });
  }, []);

  const onUpdate = useCallback(() => {
    dispatch({
      type: "UPDATE_USER",
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />
      <UserList
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
        onModify={onModify}
      />
      <div>활성 사용자 수: {count}</div>
    </>
  );
}

export default App;
