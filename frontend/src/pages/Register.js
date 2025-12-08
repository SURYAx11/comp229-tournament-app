import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // backend expects: name, email, password, role
      await api.post("/users/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "1rem auto" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Optional: let them choose manager vs user if you want */}
        {/* <div>
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div> */}

        <button type="submit" style={{ marginTop: "1rem" }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
