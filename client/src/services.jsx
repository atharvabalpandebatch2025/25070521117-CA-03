
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5000/api";

const Services = () => {
  const navigate = useNavigate();

  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const loadNominees = async () => {
    try {
      const response = await fetch(`${API_URL}/nominees`);

      if (!response.ok) {
        throw new Error("Could not load nominees");
      }

      const data = await response.json();
      setNominees(data);
    } catch (error) {
      console.error("Load nominees error:", error);
      setMessage("Could not load nominees. Please check the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNominees();
  }, []);

  const handleVote = async (nomineeId) => {
    setMessage("");

    const token = localStorage.getItem("ballonDorToken");

    if (!token) {
      setMessage("Please log in before voting.");
      navigate("/login");
      return;
    }

    // Keep a browser ID for this demo.
    let voterId = localStorage.getItem("ballonDorVoterId");

    if (!voterId) {
      voterId = crypto.randomUUID();
      localStorage.setItem("ballonDorVoterId", voterId);
    }

    try {
      setSelectedId(nomineeId);

      const response = await fetch(`${API_URL}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nomineeId,
          voterId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Your session has expired. Please log in again.");
          localStorage.removeItem("ballonDorToken");
          navigate("/login");
        } else if (response.status === 409) {
          setMessage("You have already voted. You cannot vote again.");
        } else {
          setMessage(data.message || "Vote could not be submitted.");
        }
        return;
      }

      setMessage("Your vote has been saved successfully!");
      await loadNominees();
    } catch (error) {
      console.error("Vote error:", error);
      setMessage("Could not submit your vote. Check the server.");
    } finally {
      setSelectedId("");
    }
  };

  if (loading) {
    return <div className="nominees-page">Loading nominees...</div>;
  }

  return (
    <div className="nominees-page">
      <div className="nominees-heading">
        <p className="hero-label">THE FANS' CHOICE</p>
        <h1>Ballon d'Or Nominees</h1>
        <p>Choose the player you think deserves the award.</p>
      </div>

      {message && (
        <p className="selection-message" role="status">
          {message}
        </p>
      )}

      <div className="nominees-grid">
        {nominees.map((nominee, index) => (
          <div className="nominee-card" key={nominee._id}>
            <div className="nominee-image-wrap">
              <img
                src={nominee.image}
                alt={nominee.name}
                className="nominee-image"
              />
              <span className="nominee-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="nominee-info">
              <p className="nominee-country">{nominee.country}</p>
              <h2>{nominee.name}</h2>
              <p className="nominee-position">{nominee.club}</p>

              <p className="nominee-votes">
                Votes: <strong>{nominee.votes ?? 0}</strong>
              </p>

              <button
                className="vote-button"
                onClick={() => handleVote(nominee._id)}
                disabled={selectedId !== ""}
              >
                {selectedId === nominee._id
                  ? "Submitting..."
                  : "Vote Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="sample-notice">
        College demonstration project. Nominees are sample data, not an
        official Ballon d'Or shortlist.
      </p>
    </div>
  );
};

export default Services;
