
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./App.css";

const Nav = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("ballonDorToken");

  const handleLogout = () => {
    localStorage.removeItem("ballonDorToken");
    localStorage.removeItem("ballonDorUser");
    navigate("/login");
  };

  return (
    <nav className="my-nav">
      <Link to="/" className="nav-logo">
        BALLON<span> D’OR</span>
      </Link>

      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/nominees">Nominees</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      <div className="nav-auth">
        {token ? (
          <button className="nav-vote" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/signup" className="nav-vote">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
