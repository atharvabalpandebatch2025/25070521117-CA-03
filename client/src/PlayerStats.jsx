import { Link } from "react-router-dom";
import { playerData } from "./playerData";
import "./App.css";

const PlayerStats = () => (
  <main className="player-page">
    <header className="player-page-hero">
      <p className="hero-label">THE NUMBERS BEHIND THE NOMINEES</p>
      <h1>PLAYER <span>STATISTICS</span></h1>
      <p>Explore season performance and career milestones for the four featured players.</p>
    </header>

    <section className="player-stats-grid">
      {playerData.map((player) => (
        <article className="player-stat-card" key={player.id}>
          <div className="player-stat-top">
            <img src={player.image} alt={player.name} />
            <div>
              <p className="player-country">{player.flag} {player.country}</p>
              <h2>{player.name}</h2>
              <p className="player-muted">{player.club} · {player.position}</p>
            </div>
          </div>
          <h3>{player.season} season</h3>
          <div className="player-mini-stats">
            <div><strong>{player.seasonStats.appearances}</strong><span>Matches</span></div>
            <div><strong>{player.seasonStats.goals}</strong><span>Goals</span></div>
            <div><strong>{player.seasonStats.assists}</strong><span>Assists</span></div>
          </div>
          <div className="player-career-line">
            <span>Career goals (demo)</span><strong>{player.careerStats.goals}+</strong>
          </div>
          <Link className="gold-button player-link" to={`/players/${player.id}`}>View Full Profile →</Link>
        </article>
      ))}
    </section>

    <p className="stats-disclaimer">
      Demo project: all statistical figures on this page are editable sample data and are not live or verified official statistics.
      Update the values in <code>src/playerData.js</code> before presenting them as factual.
    </p>
  </main>
);

export default PlayerStats;
