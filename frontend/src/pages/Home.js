import React, { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    // public tournaments
    api
      .get("/tournaments/public") // matches your router.get("/public", ...)
      .then((res) => setTournaments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <section style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1>TournamentHub</h1>
        <p>Manage and view tournaments.</p>
      </section>

      <section>
        <h2>Public Tournaments</h2>
        {tournaments.length === 0 ? (
          <p>No tournaments yet.</p>
        ) : (
          <ul>
            {tournaments.map((t) => (
              <li key={t._id}>
                <strong>{t.name}</strong> – {t.location} – {t.date}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Home;
