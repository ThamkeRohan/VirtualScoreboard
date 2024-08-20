import React from "react";
import { getCurrentRunRate, getRequiredRunRate } from "../../utils/scoreboard";
import { useScoreboard } from "../../contexts/ScoreboardContext";

const BALLS_PER_OVER = 6;

export default function RunRateTracker({
  score,
  isFirtInningComplete,
  isSecondInningComplete,
}) {
  const { match } = useScoreboard();
  return (
    <div className="run-rate-tracker">
      {isSecondInningComplete &&
        isFirtInningComplete &&
        score.battingFirstTeam.runs === score.battingSecondTeam.runs && (
          <p className="result">Match draw</p>
        )}

      {isSecondInningComplete &&
        isFirtInningComplete &&
        score.battingFirstTeam.runs !== score.battingSecondTeam.runs && (
          <p className="result">
            Team{" "}
            {score.battingFirstTeam.runs > score.battingSecondTeam.runs
              ? match.battingFirstTeam.name
              : match.battingSecondTeam.name}{" "}
            won
          </p>
        )}

      {!isSecondInningComplete && isFirtInningComplete && (
        <p className="runs-to-win">
          {match.battingSecondTeam.name} needs{" "}
          {score.battingFirstTeam.runs + 1 - score.battingSecondTeam.runs} runs in{" "}
          {match.totalOversPerInning * BALLS_PER_OVER -
            score.battingSecondTeam.legalDeliveries} balls
        </p>
      )}
      {!isSecondInningComplete && !isFirtInningComplete && (
        <div className="crr">
          CRR:{" "}
          {getCurrentRunRate(
            score.battingFirstTeam.runs,
            score.battingFirstTeam.legalDeliveries
          )}
        </div>
      )}
      {!isSecondInningComplete && isFirtInningComplete && (
        <div className="crr">
          CRR:{" "}
          {getCurrentRunRate(
            score.battingSecondTeam.runs,
            score.battingSecondTeam.legalDeliveries
          )}
        </div>
      )}
      <div className="rrr">
        {!isSecondInningComplete && isFirtInningComplete && (
          <div className="rrr">
            RRR:{" "}
            {getRequiredRunRate(
              score.battingSecondTeam.runs,
              score.battingFirstTeam.runs + 1,
              score.battingSecondTeam.legalDeliveries,
              match.totalOversPerInning * BALLS_PER_OVER
            )}
          </div>
        )}
      </div>
    </div>
  );
}
