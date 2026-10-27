
import './App.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-cont">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">
            THE WORLD'S MOST PRESTIGIOUS
            <br />
            INDIVIDUAL FOOTBALL AWARD
          </p>

          <h1>
            WHO DESERVES
            <br />
            THE <span>BALLON D’OR?</span>
          </h1>

          <p className="home-description">
            Celebrate football's finest players. Explore the nominees,
            choose your favourite, and make your voice count.
          </p>

          <div className="home-actions">
            <Link to="/nominees" className="home-gold-button">
              🏆 Explore Nominees <span>→</span>
            </Link>

            <Link to="/about" className="home-outline-button">
              About the Awards
            </Link>
          </div>
        </div>

        <div className="home-trophy">
          <img
            src="/ballon-dor-trophy-hero.png"
            alt="Golden football trophy illuminated in a stadium"
          />
          <div className="trophy-caption">
            <span>DREAMS</span>
            <span>PASSION</span>
            <span>FOOTBALL</span>
            <strong>BALLON D’OR</strong>
          </div>
        </div>
      </section>

      <section className="home-highlights">
        <div className="home-highlight">
          <span className="highlight-icon">★</span>
          <h3>ICONIC LEGACY</h3>
          <p>A celebration of football's greatest talents.</p>
        </div>

        <div className="home-highlight">
          <span className="highlight-icon">♟</span>
          <h3>ONE PLAYER</h3>
          <p>Your favourite player deserves recognition.</p>
        </div>

        <div className="home-highlight">
          <span className="highlight-icon">🏆</span>
          <h3>ONE VOTE</h3>
          <p>Make your choice and celebrate greatness.</p>
        </div>

        <div className="home-highlight">
          <span className="highlight-icon">⚽</span>
          <h3>YOUR VOICE</h3>
          <p>Join fans in celebrating the beautiful game.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
