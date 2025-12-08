import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function TournamentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", location: "", date: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/tournaments/${id}`)
        .then((res) => {
          const t = res.data;
          setForm({
            name: t.name || "",
            location: t.location || "",
            date: t.date ? t.date.substring(0, 10) : "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isEdit) {
        await api.put(`/tournaments/${id}`, form);
      } else {
        await api.post("/tournaments", form);
      }
      navigate("/tournaments");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "1rem auto" }}>
      <h2>{isEdit ? "Edit Tournament" : "Create Tournament"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default TournamentForm;
