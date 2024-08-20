import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1 className="heading text-xxl-bold">
              Live Match Scores, Anytime, Anywhere
            </h1>
            <p className="description text-md">
              A cricket score tracking web application that allows umpires to
              create accounts, initiate new matches, and update live scores.
              These updates are broadcasted to spectators in real-time,
              providing an up-to-date scoreboard that mirrors the live match.
            </p>
          </div>
          <div className="navigation-btns">
            <Link to="/matches" className="btn text-md-bold">
              Search matches
            </Link>
            {!isAuthenticated && (
              <Link to="/signup" className="btn text-md-bold">
                Create an account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
