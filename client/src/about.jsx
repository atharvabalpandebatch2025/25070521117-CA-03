
import "./App.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <p className="hero-label">THE LEGACY OF GREATNESS</p>

        <h1>
          ABOUT THE
          <br />
          <span>BALLON D’OR</span>
        </h1>

        <p>
          Celebrating football's finest talents, unforgettable
          performances, and the players who inspire generations.
        </p>
      </section>

      {/* Introduction */}
      <section className="about-section">
        <div className="about-content">
          <p className="hero-label">THE AWARD</p>
          <h2>A Symbol of Football Excellence</h2>

          <p>
            The Ballon d'Or is one of the most prestigious individual
            awards in football. It recognizes outstanding players for
            their performances, achievements, and contributions to the
            beautiful game.
          </p>

          <p>
            First awarded in 1956, the prize has become a symbol of
            individual excellence and footballing greatness.
          </p>
        </div>

        <div className="about-highlight">
          <span className="trophy-symbol">🏆</span>
          <h3>THE GOLDEN DREAM</h3>
          <p>
            A recognition of talent, dedication, consistency,
            and unforgettable moments on the pitch.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="about-history">
        <p className="hero-label">A RICH HISTORY</p>
        <h2>More Than a Trophy</h2>

        <div className="history-grid">
          <article className="history-card">
            <span>1956</span>
            <h3>The Beginning</h3>
            <p>
              France Football introduced the Ballon d'Or to recognize
              outstanding football talent. Stanley Matthews won the
              inaugural award.
            </p>
          </article>

          <article className="history-card">
            <span>LEGACY</span>
            <h3>Generations of Greatness</h3>
            <p>
              Legendary players have made their mark on the award,
              creating memorable moments and inspiring future stars.
            </p>
          </article>

          <article className="history-card">
            <span>TODAY</span>
            <h3>A Global Celebration</h3>
            <p>
              The awards celebrate excellence across men's and women's
              football, alongside other individual and team honours.
            </p>
          </article>
        </div>
      </section>

      {/* Award Categories */}
      <section className="about-categories">
        <p className="hero-label">THE HONOURS</p>
        <h2>Major Award Categories</h2>

        <div className="category-grid">
          <article className="category-card">
            <span>🏆</span>
            <h3>Men's Ballon d'Or</h3>
            <p>Recognizes excellence in men's football.</p>
          </article>

          <article className="category-card">
            <span>🌟</span>
            <h3>Women's Ballon d'Or</h3>
            <p>Celebrates outstanding performances in women's football.</p>
          </article>

          <article className="category-card">
            <span>⭐</span>
            <h3>Kopa Trophy</h3>
            <p>Honours an outstanding young footballer.</p>
          </article>

          <article className="category-card">
            <span>🧤</span>
            <h3>Yashin Trophy</h3>
            <p>Recognizes excellence in goalkeeping.</p>
          </article>

          <article className="category-card">
            <span>⚽</span>
            <h3>Gerd Müller Trophy</h3>
            <p>Recognizes outstanding goalscoring achievements.</p>
          </article>

          <article className="category-card">
            <span>🤝</span>
            <h3>Socrates Award</h3>
            <p>Recognizes humanitarian work and social impact.</p>
          </article>
        </div>
      </section>

      {/* Our Fan Voting */}
      <section className="fan-voting-section">
        <p className="hero-label">YOUR VOICE MATTERS</p>
        <h2>How Our Fan Voting Works</h2>

        <div className="voting-steps">
          <div>
            <span>01</span>
            <h3>Explore</h3>
            <p>Discover the players featured on our nominees page.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Choose</h3>
            <p>Select the player you believe deserves recognition.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Vote</h3>
            <p>Log in and submit your vote to support your favourite.</p>
          </div>
        </div>

        <p className="fan-voting-note">
          This website is a college demonstration project. Its fan votes
          are separate from the official Ballon d'Or selection process.
        </p>
      </section>
    </div>
  );
};

export default About;
