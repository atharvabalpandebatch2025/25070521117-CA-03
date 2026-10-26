
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaderboard = async () => {
    try {
      setError("");

      const [nomineesResponse, votesResponse] = await Promise.all([
        fetch(`${API_URL}/api/nominees`),
        fetch(`${API_URL}/api/votes/count`),
      ]);

      if (!nomineesResponse.ok || !votesResponse.ok) {
        throw new Error("Unable to load leaderboard data.");
      }

      const nominees = await nomineesResponse.json();
      const voteData = await votesResponse.json();

      const rankedPlayers = nominees.sort(
        (a, b) => b.votes - a.votes
      );

      setPlayers(rankedPlayers);
      setTotalVotes(voteData.total);
    } catch (err) {
      setError("Could not load the leaderboard. Please check that the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <section className="leaderboard-hero">
        <p className="leaderboard-label">THE FANS HAVE THEIR SAY</p>
        <h1>Fan Voting <span>Leaderboard</span></h1>
        <p>
          See which football stars are leading the race.
          Every vote counts!
        </p>

        <div className="leaderboard-total">
          <span>Total Fan Votes</span>
          <strong>{totalVotes.toLocaleString()}</strong>
        </div>

        <button
          className="leaderboard-refresh"
          onClick={() => {
            setLoading(true);
            fetchLeaderboard();
          }}
        >
          Refresh Results
        </button>
      </section>

      <section className="leaderboard-content">
        <h2>Top Contenders</h2>
        <p className="leaderboard-subtitle">
          Players are ranked by the number of votes received.
        </p>

        {loading && <p className="leaderboard-message">Loading results...</p>}

        {!loading && error && (
          <p className="leaderboard-message">{error}</p>
        )}

        {!loading && !error && players.length === 0 && (
          <p className="leaderboard-message">No nominees found yet.</p>
        )}

        {!loading && !error && players.length > 0 && (
          <div className="leaderboard-list">
            {players.map((player, index) => (
              <div className="leaderboard-card" key={player._id}>
                <div className="leaderboard-rank">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}
                </div>

                <img
                  className="leaderboard-player-image"
                  src={`${API_URL.replace(":5000", ":5173")}${player.image}`}
                  alt={player.name}
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />

                <div className="leaderboard-player-info">
                  <h3>{player.name}</h3>
                  <p>{player.club || "Club not available"}</p>
                  <span>{player.country || "Country not available"}</span>
                </div>

                <div className="leaderboard-votes">
                  <strong>{player.votes || 0}</strong>
                  <span>Votes</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="leaderboard-note">
          This is a college fan-voting project. These results are not
          the official Ballon d’Or award rankings.
        </p>
      </section>
    </div>
  );
};

export default Leaderboard;
