import React from "react";
import { useScoreboard } from "../../contexts/ScoreboardContext";
import TeamScore from "./TeamScore";

export default function MatchScore({score}) {
  const { match } = useScoreboard();

  return (
    <div className="match-score">
      <TeamScore
        teamName={match.battingFirstTeam.name}
        runs={score.battingFirstTeam.runs}
        wickets={score.battingFirstTeam.wickets}
        legalDeliveries={score.battingFirstTeam.legalDeliveries}
        totalDeliveries={score.battingFirstTeam.totalDeliveries}
      />
      <TeamScore
          teamName={match.battingSecondTeam.name}
          runs={score.battingSecondTeam.runs}
          wickets={score.battingSecondTeam.wickets}
          legalDeliveries={score.battingSecondTeam.legalDeliveries}
          totalDeliveries={score.battingSecondTeam.totalDeliveries}
        />
    </div>
  );
}
