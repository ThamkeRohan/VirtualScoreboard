import React from "react";

const BALLS_PER_OVER = 6;

export default function TeamScore({
  teamName,
  runs,
  wickets,
  legalDeliveries,
  totalDeliveries
}) {
  return (
    <div className="team">
      <p className="team-name text-md-bold">{teamName}</p>
      {totalDeliveries > 0 ? (
        <div className="team-score text-md-bold">
          <div className="runs-wickets">
            <span>{runs}/</span>
            <span>{wickets}</span>
          </div>
          <div className="overs text-sm-bold">
            {`(${Math.floor(legalDeliveries / BALLS_PER_OVER)}.${
              legalDeliveries % BALLS_PER_OVER
            })`}
          </div>
        </div>
      ) : (
        <div>Yet to bat</div>
      )}
    </div>
  );
}

