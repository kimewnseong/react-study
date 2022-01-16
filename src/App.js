import React, { useReducer, useMemo } from "react";
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

// UserDispatch라는 이름으로 내보내줌 (사용하고 싶은 곳에서 불러서 사용 가능)
export const UserDispatch = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { username, email } = state.inputs;
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
