import { useState } from "react";
import { Link } from "react-router-dom";
import { playerData } from "./playerData";
import "./App.css";

const ComparePlayers = () => {
  const [firstId, setFirstId] = useState("messi");
  const [secondId, setSecondId] = useState("haaland");

  const first = playerData.find((player) => player.id === firstId);
  const second = playerData.find((player) => player.id === secondId);

  const comparisonRows = [
    ["Club", first.club, second.club],
    ["Country", `${first.flag} ${first.country}`, `${second.flag} ${second.country}`],
    ["Season", first.season, second.season],
    ["Season appearances", first.seasonStats.appearances, second.seasonStats.appearances],
    ["Season goals", first.seasonStats.goals, second.seasonStats.goals],
    ["Season assists", first.seasonStats.assists, second.seasonStats.assists],
    ["Career appearances", first.careerStats.appearances, second.careerStats.appearances],
    ["Career goals", first.careerStats.goals, second.careerStats.goals],
    ["Career assists", first.careerStats.assists, second.careerStats.assists],
    ["Major trophies", first.careerStats.trophies, second.careerStats.trophies],
  ];

  return (
    <main className="player-page">
      <header className="player-page-hero">
        <p className="hero-label">HEAD-TO-HEAD</p>
        <h1>COMPARE <span>PLAYERS</span></h1>
        <p>Choose any two featured players to compare their season and career figures.</p>
      </header>

      <section className="compare-selectors">
        <label>
          First player
          <select value={firstId} onChange={(event) => setFirstId(event.target.value)}>
            {playerData.map((player) => <option key={player.id} value={player.id}>{player.name}</option>)}
          </select>
        </label>
        <span className="compare-vs">VS</span>
        <label>
          Second player
          <select value={secondId} onChange={(event) => setSecondId(event.target.value)}>
            {playerData.map((player) => <option key={player.id} value={player.id}>{player.name}</option>)}
          </select>
        </label>
      </section>

      {firstId === secondId && (
        <p className="compare-warning" role="status">Choose two different players for a more useful comparison.</p>
      )}

      <section className="compare-player-headings">
        {[first, second].map((player) => (
          <article className="compare-player" key={player.id}>
            <img src={player.image} alt={player.name} />
            <h2>{player.name}</h2>
            <p>{player.club}</p>
            <Link to={`/players/${player.id}`}>View profile →</Link>
          </article>
        ))}
      </section>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead><tr><th>Statistic</th><th>{first.shortName}</th><th>{second.shortName}</th></tr></thead>
          <tbody>
            {comparisonRows.map(([label, firstValue, secondValue]) => (
              <tr key={label}><th scope="row">{label}</th><td>{firstValue}</td><td>{secondValue}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="stats-disclaimer">
        Demo project: values are editable sample data and are not live or verified official statistics.
        Update <code>src/playerData.js</code> before presenting them as factual.
      </p>
    </main>
  );
};

export default ComparePlayers;
