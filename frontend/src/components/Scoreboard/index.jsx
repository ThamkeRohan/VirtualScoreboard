import React from "react";
import MatchScore from "./MatchScore";
import RunRateTracker from "./RunRateTracker";
import ScoreUpdater from "./ScoreUpdater";
import ScoreboardNavigation from "./ScoreboardNavigation";
import OverDetail from "./OverDetail";

export default function Scoreboard() {
  return (
    <div>
      <h1>Scoreboard</h1>
      <MatchScore />
      <RunRateTracker />
      <div>
        <ScoreboardNavigation />
        <OverDetail />
      </div>
      <ScoreUpdater />
    </div>
  );
}
