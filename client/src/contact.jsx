
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
