import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function TournamentsList() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await api.get("/tournaments"); // protected list
      setTournaments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tournament?")) return;
    try {
      await api.delete(`/tournaments/${id}`);
      setTournaments((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading tournaments...</p>;

  return (
    <div>
      <h2>My Tournaments</h2>
      <button onClick={() => navigate("/tournaments/new")}>Create New Tournament</button>

      {tournaments.length === 0 ? (
        <p>No tournaments created yet.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.location}</td>
                <td>{t.date}</td>
                <td>
                  <button onClick={() => navigate(`/tournaments/${t._id}/edit`)}>Edit</button>
                  <button onClick={() => handleDelete(t._id)} style={{ marginLeft: "0.5rem" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TournamentsList;
