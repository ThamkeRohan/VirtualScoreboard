import React from 'react'

export default function ErrorMessage({error}) {
  return (
    <div className="error">
      <div className="error-logo">
        <span class="material-symbols-outlined error-icon text-xxl-bold">
          error
        </span>
        <p className="text-xl-bold">Error</p>
      </div>
      <p className="error-msg text-md">{error}</p>
    </div>
  );
}
