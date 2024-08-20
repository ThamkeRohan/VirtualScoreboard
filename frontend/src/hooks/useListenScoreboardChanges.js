import { useEffect, useState } from "react";
import { settings } from "../data/settings";
import { getTeamScore, isInningsComplete } from "../utils/scoreboard";

const BALLS_PER_OVER = 6;

export default function useListenScoreboardChanges(match) {
  const [score, setScore] = useState({
    battingFirstTeam: {
      runs: 0,
      wickets: 0,
      legalDeliveries: 0,
      totalDeliveries: 0,
      legalDeliveriesPerOver: new Array(match.totalOversPerInning).fill(0),
      totalDeliveriesPerOver: new Array(match.totalOversPerInning).fill(0),
    },
    battingSecondTeam: {
      runs: 0,
      wickets: 0,
      legalDeliveries: 0,
      totalDeliveries: 0,
      legalDeliveriesPerOver: new Array(match.totalOversPerInning).fill(0),
      totalDeliveriesPerOver: new Array(match.totalOversPerInning).fill(0),
    },
  });
  const [isFirstInningComplete, setIsFirstInningComplete] = useState(false);
  const [isSecongInningComplete, setIsSecondInningComplete] = useState(false);
  
  useEffect(() => {
    setScore((prevScore) => ({
      ...prevScore,
      battingFirstTeam: getTeamScore(
        settings,
        match.battingFirstTeam.oversFaced
      ),
    }));
  }, [match.battingFirstTeam.oversFaced]);

  useEffect(() => {
    setScore((prevScore) => ({
      ...prevScore,
      battingSecondTeam: getTeamScore(
        settings,
        match.battingSecondTeam.oversFaced
      ),
    }));
  }, [match.battingSecondTeam.oversFaced]);

  useEffect(() => {
    setIsFirstInningComplete(
      isInningsComplete(
        score.battingFirstTeam.wickets,
        match.totalPlayersPerTeam,
        score.battingFirstTeam.legalDeliveries,
        match.totalOversPerInning * BALLS_PER_OVER
      )
    );
  }, [score.battingFirstTeam]);

  useEffect(() => {
    setIsSecondInningComplete(
      isInningsComplete(
        score.battingSecondTeam.wickets,
        match.totalPlayersPerTeam,
        score.battingSecondTeam.legalDeliveries,
        match.totalOversPerInning * BALLS_PER_OVER,
        score.battingSecondTeam.runs,
        score.battingFirstTeam.runs + 1
      )
    );
  }, [score.battingSecondTeam]);

  return { score, isFirstInningComplete, isSecongInningComplete };
}
