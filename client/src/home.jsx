
import './App.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-cont">
      <section className="hero">
        <p className="hero-label">THE BEAUTIFUL GAME. YOUR VOTE.</p>

        <h1>
          WHO DESERVES
          <br />
          THE <span>BALLON D’OR?</span>
        </h1>

        <p className="hero-description">
          Celebrate football's finest players. Explore the nominees,
          choose your favourite, and make your voice count.
        </p>

        <div className="hero-buttons">
          <Link to="/nominees" className="gold-button">
            Explore Nominees →
          </Link>

          <Link to="/about" className="outline-button">
            About the Awards
          </Link>
        </div>

        <div className="hero-footer">
          <div>
            <h3>ONE PLAYER</h3>
            <p>Your favourite</p>
          </div>

          <div>
            <h3>ONE VOTE</h3>
            <p>Make it count</p>
          </div>

          <div>
            <h3>YOUR VOICE</h3>
            <p>Celebrate greatness</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
