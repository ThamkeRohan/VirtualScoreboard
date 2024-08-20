import React from "react";
import { getTeamScore } from "../../utils/scoreboard";
import {settings} from "../../data/settings"
import TeamScore from "../Scoreboard/TeamScore";
import { getMonthNameDayYearFormattedDate } from "../../utils/date";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function MatchCard({ match }) {
  
  const battingFirstTeamScore = getTeamScore(
    settings,
    match.battingFirstTeam.oversFaced
  );
  const battingSecondTeamScore = getTeamScore(
    settings,
    match.battingSecondTeam.oversFaced
  );
  const { isAuthenticated, umpire } = useAuth();
  const scoreboardType =
    isAuthenticated && umpire._id === match.umpireId._id
      ? "umpire-scoreboard"
      : "spectator-scoreboard";

  return (
    <>
      <div className="card match-card">
        <Link
          to={`/${scoreboardType}/matches/${match._id}/teams/battingFirstTeam/overs/${match.battingFirstTeam.oversFaced[0]._id}`}
        >
          <p className="date text-sm">
            {getMonthNameDayYearFormattedDate(match.createdAt)}
          </p>
          <div>
            <TeamScore
              teamName={match.battingFirstTeam.name}
              runs={battingFirstTeamScore.runs}
              wickets={battingFirstTeamScore.wickets}
              legalDeliveries={battingFirstTeamScore.legalDeliveries}
              totalDeliveries={battingFirstTeamScore.totalDeliveries}
            />
            <TeamScore
              teamName={match.battingSecondTeam.name}
              runs={battingSecondTeamScore.runs}
              wickets={battingSecondTeamScore.wickets}
              legalDeliveries={battingSecondTeamScore.legalDeliveries}
              totalDeliveries={battingSecondTeamScore.totalDeliveries}
            />
          </div>
          <div className="match-meta text-sm">
            <div>
              <p>
                <strong>Umpire: </strong> {match.umpireId.umpireName}
              </p>
            </div>
            <div>
              <p className="match-status">
                <span>
                  <strong>Match status: </strong> {match.matchStatus}{" "}
                </span>

                {match.matchStatus === "pending" ? (
                  <span className="material-symbols-outlined pending">pending</span>
                ) : (
                  <span className="material-symbols-outlined completed">
                    task_alt
                  </span>
                )}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
