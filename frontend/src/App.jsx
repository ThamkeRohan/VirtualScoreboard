import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import {
  useErrorPortal,
  useErrorPortalUpdate,
} from "./contexts/ErrorPortalContext";
import ErrorModal from "./components/Error/ErrorModal";
import AppRoutes from "./components/AppRoutes";
import ProfileBadge from "./components/ProfileBadge";
import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";

function App() {
  const { error } = useErrorPortal();
  const {isAuthenticated} = useAuth()
  const { closeError } = useErrorPortalUpdate();
  return (
    <>
      <header className="app-header">
        <div className="container">
          <h1 className="app-title text-lg-bold">
            <Link to="/">VirtualScoreboard</Link>
          </h1>
          <div>
            {isAuthenticated && <ProfileBadge />}
            <Navigation />
          </div>
        </div>
      </header>

      <AppRoutes />

      <ErrorModal error={error} closeErrorModal={closeError} />
    </>
  );
}

export default App;
