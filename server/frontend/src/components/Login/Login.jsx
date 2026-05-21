import React, { useState } from "react";
import "./Login.css";

const Login = ({ onClose, onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const login = async () => {
    const res = await fetch("/djangoapp/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });
    const data = await res.json();
    if (data.status === "Authenticated") {
      onLogin(data.userName);
      onClose();
    } else {
      setErr("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login_modal">
      <div className="login_container">
        <h2>Login</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Login;
