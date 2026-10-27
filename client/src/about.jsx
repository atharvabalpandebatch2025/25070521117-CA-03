
import "./App.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="hero-label">THE LEGACY OF GREATNESS</p>

          <h1>
            ABOUT THE
            <br />
            <span>BALLON D’OR</span>
          </h1>

          <p className="about-hero-description">
            Celebrating football's finest talents, unforgettable
            performances, and the players who inspire generations.
          </p>

          <a href="/nominees" className="about-hero-button">
            EXPLORE NOMINEES <span>→</span>
          </a>
        </div>

        {/* Golden Trophy Image */}
        <div className="about-trophy">
          <div className="trophy-glow"></div>

          <img
            src="/ballon-dor-trophy.png"
            alt="Golden Ballon d'Or football trophy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <div className="trophy-caption">
            <span>✦</span> THE GOLDEN DREAM
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-section">
        <div className="about-stadium-image">
          <div className="stadium-overlay">
            <span>THE BEAUTIFUL GAME</span>
          </div>
        </div>

        <div className="about-content">
          <p className="hero-label">THE AWARD</p>

          <h2>
            A Symbol of Football <span>Excellence</span>
          </h2>

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
        <div className="section-heading">
          <p className="hero-label">A RICH HISTORY</p>
          <h2>
            More Than a <span>Trophy</span>
          </h2>
          <p className="section-subtitle">
            A journey through decades of footballing greatness.
          </p>
        </div>

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
        <div className="section-heading">
          <p className="hero-label">THE HONOURS</p>
          <h2>
            Major Award <span>Categories</span>
          </h2>
          <p className="section-subtitle">
            Celebrating excellence across every corner of football.
          </p>
        </div>

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

      {/* Fan Voting */}
      <section className="fan-voting-section">
        <div className="section-heading">
          <p className="hero-label">YOUR VOICE MATTERS</p>
          <h2>
            How Our <span>Fan Voting</span> Works
          </h2>
          <p className="section-subtitle">
            Football belongs to everyone. Make your choice count.
          </p>
        </div>

        <div className="voting-steps">
          <div className="voting-step">
            <span className="step-number">01</span>
            <h3>Explore</h3>
            <p>Discover the players featured on our nominees page.</p>
          </div>

          <div className="voting-step">
            <span className="step-number">02</span>
            <h3>Choose</h3>
            <p>Select the player you believe deserves recognition.</p>
          </div>

          <div className="voting-step">
            <span className="step-number">03</span>
            <h3>Vote</h3>
            <p>Log in and submit your vote to support your favourite.</p>
          </div>
        </div>

        <p className="fan-voting-note">
          <span>ⓘ</span>
          This website is a college demonstration project. Its fan votes
          are separate from the official Ballon d'Or selection process.
        </p>

        <a href="/nominees" className="about-cta-button">
          MEET THE NOMINEES <span>→</span>
        </a>
      </section>
    </div>
  );
};

export default About;
