import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { login } from "../../services/auth";
import { useAsyncFn } from "../../hooks/useAsync";
import Loading from "../../components/Loading";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const loginFn = useAsyncFn(login)
  const {login: loginLocally} = useAuthUpdate()
  const navigate = useNavigate()

  function loginASGuest() {
    loginFn
      .execute({
        umpireName: "Guest",
        password: "Guest@123",
      })
      .then((data) => {
        loginLocally(data.umpire, data.token);
        navigate("/matches")
      });
  }
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
            <Link to="/matches" className="btn text-md-bold link">
              Search matches
            </Link>
            {!isAuthenticated && (
              <Link to="/signup" className="btn text-md-bold link">
                Create an account
              </Link>
            )}
            {!isAuthenticated && (
              <button className="btn text-md-bold link" onClick={loginASGuest}>
                {loginFn.loading ? <Loading isBtnLoading/> : "Continue as guest"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
