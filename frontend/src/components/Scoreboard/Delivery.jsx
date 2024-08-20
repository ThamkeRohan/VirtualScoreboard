import React from 'react'

export default function Delivery({type, isWicket, runs}) {
  return (
    <div
      className={`text-normal-bold delivery type-${type} runs-${runs} ${
        isWicket ? "wicket" : ""
      }`}
    >
      {type !== "legal" && <span>{type}</span>}

      {isWicket && (
        <>
          {type !== "legal" && (
            <span className="material-symbols-outlined text-sm-bold">add</span>
          )}
          <span>Out</span>
        </>
      )}

      {runs === 0 && type === "legal" && !isWicket && <span>0</span>}

      {runs > 0 && (
        <>
          {(type !== "legal" || isWicket) && (
            <span className="material-symbols-outlined text-sm-bold">add</span>
          )}
          <span>{runs}</span>
        </>
      )}
    </div>
  );
}
