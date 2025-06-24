import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section className="home">
      <h1>Welcome to The Zoo</h1>
      <p>Discover our amazing animals and find out when they need food!</p>
      <Link to="/animals" className="btn">See animals</Link>
    </section>
  );
};

export default Home