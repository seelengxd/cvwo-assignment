import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ signIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
