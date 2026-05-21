import React, { useState } from "react";
import "./Login.css";

const Login = () => {
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
      sessionStorage.setItem("username", data.userName);
      window.location.href = "/dealers";
    } else {
      setErr("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{padding:"40px", maxWidth:"400px", margin:"auto"}}>
      <h2>Login</h2>
      {err && <p style={{color:"red"}}>{err}</p>}
      <input placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} style={{display:"block", marginBottom:"10px", width:"100%", padding:"8px"}} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{display:"block", marginBottom:"10px", width:"100%", padding:"8px"}} />
      <button onClick={login} style={{padding:"8px 20px"}}>Login</button>
    </div>
  );
};

export default Login;
