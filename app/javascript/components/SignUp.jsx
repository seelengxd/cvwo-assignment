import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ signUp, user }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(false);
  const [running, setRunning] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function handleError(e) {
    setHasError(true);
    setErrors(e.data.errors);
    setRunning(false);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setRunning(true);
    await signUp({ username, email, password }, handleError);
    await sleep(3000);
    setRunning(false);
    if (user?.username) navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="field">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={8}
          required
        />
      </div>
      {hasError && <div className="delete">Error: Email {errors.email}</div>}
      <div className="field">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
