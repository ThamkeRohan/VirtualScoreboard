import React from "react";
import ReactDOM from "react-dom";

export default function ErrorModal({ error, closeErrorModal }) {
  
  if (!error) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="error-modal">
      <div className="error-background"></div>
      <div className="error">
        <div>
          <div className="error-logo">
            <span className="material-symbols-outlined error-icon text-xxl-bold">
              error
            </span>
            <p className="text-xl-bold">Error</p>
          </div>
          <p className="error-msg text-md">{error}</p>
        </div>
        <button onClick={closeErrorModal} className="btn">Close</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
