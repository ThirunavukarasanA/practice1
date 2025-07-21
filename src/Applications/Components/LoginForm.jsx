import React, { useState } from "react";

function LoginForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const validation = () => {
    if (name === "") {
      error.name = "enter your name";
      console.log("enter your name");
    }
    if (email === "") {
      error.name = "enter your email";
      console.log("enter your email");
    }
    return error;
  };
  const handleSubmit = () => {
    // console.log(name, email);
  };
  return (
    <div>
      <div>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="border"
        />
      </div>
      <div>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border"
        />
      </div>
      <div>
        <button
          id="submit"
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
          className="border py-2 px-4"
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
