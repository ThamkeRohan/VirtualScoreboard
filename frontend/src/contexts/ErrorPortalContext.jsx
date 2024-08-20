import React, { useContext, useState } from "react";

const ErrorPortalContext = React.createContext();
const ErrorPortalUpdateContext = React.createContext();

export function useErrorPortal() {
  return useContext(ErrorPortalContext);
}
export function useErrorPortalUpdate() {
  return useContext(ErrorPortalUpdateContext);
}

export function ErrorPortalProvider({ children }) {
  const [error, setError] = useState(null)

  function addError(error) {
    setError(error)
  }
  function closeError() {
    setError(null)
  }
  return (
    <ErrorPortalContext.Provider value={{ error }}>
      <ErrorPortalUpdateContext.Provider value={{ addError, closeError }}>
        {children}
      </ErrorPortalUpdateContext.Provider>
    </ErrorPortalContext.Provider>
  );
}
