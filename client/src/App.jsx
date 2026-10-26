
import { Routes, Route } from "react-router-dom";
import About from "./about";
import Home from "./home";
import Services from "./services";
import Contact from "./contact";
import Nav from "./nav";
import Signup from "./signup";
import Login from "./login";

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/nominees" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </>
  );
};

export default App;
