import React from "react";
import { Link, useParams } from "react-router-dom";
import { useScoreboard } from "../../contexts/ScoreboardContext";

export default function ScoreboardNavigation({ scoreboardType }) {
  const { matchId, team, overId } = useParams();
  const { match } = useScoreboard();
  const isBattingFirstTeam =
    window.location.pathname.includes("battingFirstTeam");

  return (
    <nav className="scoreboard-navigation">
      <ul className="teams-nav text-md-bold">
        <div className={`${isBattingFirstTeam ? "active" : ""}`}>
          <Link
            to={`/${scoreboardType}/matches/${matchId}/teams/battingFirstTeam/overs/${match.battingFirstTeam.oversFaced[0]._id}`}
          >
            {match.battingFirstTeam.name}
          </Link>
        </div>
        <div className={`${!isBattingFirstTeam ? "active" : ""}`}>
          <Link
            to={`/${scoreboardType}/matches/${matchId}/teams/battingSecondTeam/overs/${match.battingSecondTeam.oversFaced[0]._id}`}
          >
            {match.battingSecondTeam.name}
          </Link>
        </div>
      </ul>
      <ul className="overs-nav">
        {match[team].oversFaced.map((over, overIndex) => (
          <div
            key={over._id}
            className={`${over._id === overId ? "active" : ""}`}
          >
            <Link
              className="text-md-bold"
              to={`/${scoreboardType}/matches/${matchId}/teams/${team}/overs/${over._id}`}
            >
              {overIndex + 1}
            </Link>
          </div>
        ))}
      </ul>
    </nav>
  );
}
