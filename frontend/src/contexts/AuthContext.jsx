import React, { useContext, } from "react";
import {useLocalStorage} from "../hooks/useLocalStorage"

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function useAuthUpdate() {
  return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useLocalStorage("UMPIRE_AUTH_STATE", {
    isAuthenticated: false,
    umpire: null,
    token: null
  });
  
  function login(umpire, token) {
    setAuthState({
      isAuthenticated: true,
      umpire,
      token
    });
  }
  function logout() {
    setAuthState({
      isAuthenticated: false,
      umpire: null,
      token: null
    });
  }
  return (
    <AuthContext.Provider value={{...authState}}>
      <AuthUpdateContext.Provider
        value={{ login, logout }}
      >
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
