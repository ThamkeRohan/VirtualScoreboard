import React, { useEffect, useRef, useState } from "react";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [showMenu, setShowMenu] = useState(false)
  const { isAuthenticated, umpire } = useAuth();
  const { logout } = useAuthUpdate();
  const navRef = useRef()

  useEffect(() => {
    function handleClick(e) {
      if(!navRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    if(showMenu) {
      document.addEventListener("mousedown", handleClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [showMenu])

  return (
    <div ref={navRef}>
      <button onClick={() => setShowMenu(prev => !prev)} className="btn menu-btn">
        {showMenu ? (
          <span className="material-symbols-outlined">close</span>
        ) : (
          <span className="material-symbols-outlined">menu</span>
        )}
      </button>

      {showMenu && (
        <nav className={`navbar text-normal-bold`}>
          <ul>
            <li>
              <NavLink to="/matches">All Matches</NavLink>
            </li>

            <li>
              <NavLink to="/toss">Toss</NavLink>
            </li>

            {!isAuthenticated && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}

            {!isAuthenticated && (
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li>
                <NavLink to="/match-setup">Start New Match</NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li>
                <NavLink to={`/matches/umpires/${umpire._id}`}>
                  Matches Created By Me
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="btn logout-btn"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
