import React, { useState } from "react";
import "./Register.css";

const Register = ({ onClose, onLogin }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", userName: "", password: "" });
  const [err, setErr] = useState("");

  const register = async () => {
    const res = await fetch("/djangoapp/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.status === "Authenticated") {
      onLogin(data.userName);
      onClose();
    } else {
      setErr(data.error || "Registration failed.");
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="login_modal">
      <div className="login_container">
        <h2>Register</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="userName" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button onClick={register}>Register</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Register;
