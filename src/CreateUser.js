import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        value={username}
        name="username"
        placeholder="닉네임"
        onChange={onChange}
      />
      <input
        value={email}
        name="email"
        placeholder="이메일"
        onChange={onChange}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;