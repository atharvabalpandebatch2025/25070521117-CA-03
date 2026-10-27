import { Link, useParams } from "react-router-dom";
import { playerData, statLabels } from "./playerData";
import "./App.css";

const PlayerProfile = () => {
  const { playerId } = useParams();
  const player = playerData.find((item) => item.id === playerId);

  if (!player) {
    return (
      <main className="player-page">
        <section className="player-not-found">
          <h1>Player not found</h1>
          <Link className="gold-button" to="/player-stats">Back to Player Stats</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="player-page">
      <section className="profile-hero">
        <img className="profile-image" src={player.image} alt={player.name} />
        <div className="profile-intro">
          <p className="hero-label">PLAYER PROFILE</p>
          <h1>{player.name}</h1>
          <p className="profile-country">{player.flag} {player.country}</p>
          <p className="player-muted">{player.club} · {player.position}</p>
          <p className="profile-bio">{player.bio}</p>
          <Link className="outline-button" to="/compare-players">Compare Players →</Link>
        </div>
      </section>

      <section className="profile-stats-section">
        <div className="section-heading">
          <p className="hero-label">SEASON PERFORMANCE</p>
          <h2>{player.season}</h2>
        </div>
        <div className="profile-stat-grid">
          {[
            ["Appearances", player.seasonStats.appearances],
            ["Goals", player.seasonStats.goals],
            ["Assists", player.seasonStats.assists],
          ].map(([label, value]) => (
            <div className="profile-stat-box" key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <section className="profile-stats-section">
        <div className="section-heading">
          <p className="hero-label">CAREER OVERVIEW</p>
          <h2>Career Statistics</h2>
        </div>
        <div className="profile-stat-grid">
          {statLabels.map(([key, label]) => (
            <div className="profile-stat-box" key={key}>
              <strong>{player.careerStats[key]}</strong><span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-achievements">
        <p className="hero-label">HIGHLIGHTS</p>
        <h2>Achievements</h2>
        <ul>{player.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
      </section>

      <p className="stats-disclaimer">
        Demo project: statistics are editable sample figures, not live or verified official records.
        Update <code>src/playerData.js</code> to maintain the figures.
      </p>
      <div className="profile-bottom-links">
        <Link to="/player-stats" className="outline-button">← All Player Stats</Link>
        <Link to="/nominees" className="gold-button">Nominees & Voting →</Link>
      </div>
    </main>
  );
};

export default PlayerProfile;
