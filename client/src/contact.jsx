
const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <p className="contact-subtitle">
        Have questions or suggestions? We'd love to hear from you!
      </p>

      <div className="contact-container">
        <div className="contact-card">
          <h2>Get in Touch</h2>
          <p>
            If you have any questions about our Ballon d'Or Fan Voting
            website, feel free to contact our team.
          </p>

          <div className="contact-item">
            <h3>📧 Email</h3>
            <p>atharvabalpande45@gmail.com</p>
          </div>

          <div className="contact-item">
            <h3>⚽ About Our Website</h3>
            <p>
              This platform allows football fans to explore nominees
              and cast their votes for their favourite players.
            </p>
          </div>

          <div className="contact-item">
            
          <div className="contact-item event-info">
            <h3>🏆 Ballon d'Or 2026 Ceremony</h3>

            <p>
              Celebrate the 70th anniversary of football's most
              prestigious individual award!
            </p>

            <p>
              <strong>📅 Date:</strong> 26 October 2026
              (London local time)
            </p>

            <p>
              <strong>📍 Venue:</strong> The London Palladium
            </p>

            <p>
              <strong>🌍 Location:</strong> London, England,
              United Kingdom
            </p>

            <p>
              <strong>🕗 Ceremony time:</strong> 8:00 PM GMT
            </p>

            <p>
              The 70th edition celebrates football excellence
              and pays tribute to Sir Stanley Matthews, the
              first-ever Ballon d'Or winner in 1956.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=The+London+Palladium+London"
              target="_blank"
              rel="noopener noreferrer"
              className="event-map-link"
            >
              📍 View Venue on Google Maps
            </a>
          </div>

            <h3>💬 Feedback</h3>
            <p>
              Your feedback and suggestions help us improve the
              fan voting experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
