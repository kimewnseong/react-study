import React, { useReducer, useMemo } from "react";
import UserList from "./components/UserList";
import CreateUser from "./CreateUser";
import produce from "immer";

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
      return produce(state, (draft) => {
        const input = draft.inputs;
        input[action.name] = action.value;
      });
    }

    case "CREATE_USER": {
      return produce(state, (draft) => {
        const input = draft.inputs;

        draft.users.push(action.user);
        input.username = "";
        input.email = "";
      });
    }

    case "TOGGLE_USER": {
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    }

    case "REMOVE_USER": {
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    }
    case "MODIFY_USER": {
      return produce(state, (draft) => {
        const input = draft.inputs;
        input.username = action.username;
        input.email = action.email;
        input.id = action.id;
      });
    }

    case "UPDATE_USER": {
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === draft.inputs.id);
        const input = draft.inputs;

        user.username = input.username;
        user.email = input.email;

        input.username = "";
        input.email = "";
      });
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
