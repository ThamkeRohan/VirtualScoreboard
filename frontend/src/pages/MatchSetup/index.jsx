import React, { useState } from "react";
import Counter from "./Counter";
import { useAsyncFn } from "../../hooks/useAsync";
import { createNewMatch } from "../../services/match";
import { useNavigate } from "react-router-dom";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";
import Loading from "../../components/Loading";

export default function MatchSetup() {
  const [battingFirstTeamName, setBattingFirstTeamName] = useState("");
  const [battingSecondTeamName, setBattingSecondTeamName] = useState("");
  const [totalOversPerInning, setTotalOversPerInning] = useState(4);
  const [totalPlayersPerTeam, setTotalPlayersPerTeam] = useState(5);
  
  const createNewMatchFn = useAsyncFn(createNewMatch);
  const navigate = useNavigate();
  const { addError } = useErrorPortalUpdate();

  function handleSubmit(e) {
    e.preventDefault();

    if(battingFirstTeamName.trim().length === 0 || battingSecondTeamName.trim().length === 0) {
      return addError("All fields are required")
    }
    
    createNewMatchFn
      .execute({
        battingFirstTeamName,
        battingSecondTeamName,
        totalOversPerInning,
        totalPlayersPerTeam,
      })
      .then((match) => {
        const matchId = match._id;
        const overId = match.battingFirstTeam.oversFaced[0]._id;
        navigate(
          `/umpire-scoreboard/matches/${matchId}/teams/battingFirstTeam/overs/${overId}`
        );
      })
      .catch((message) => addError(message));
  }

  return (
    <div className="match-setup">
      <div className="container-sm">
        <h1 className="page-heading text-xl-bold">Match setup</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            className="form-input"
            type="text"
            placeholder="Batting first team name"
            value={battingFirstTeamName}
            onChange={(e) => setBattingFirstTeamName(e.target.value)}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Batting second team name"
            value={battingSecondTeamName}
            onChange={(e) => setBattingSecondTeamName(e.target.value)}
          />
          <Counter
            label="Overs"
            value={totalOversPerInning}
            setValue={setTotalOversPerInning}
            minValue={1}
            maxValue={10}
          />
          <Counter
            label="Total players"
            value={totalPlayersPerTeam}
            setValue={setTotalPlayersPerTeam}
            minValue={2}
            maxValue={11}
          />

          <button 
          disabled={createNewMatchFn.loading}
          className="btn btn-block submit-btn">
            {createNewMatchFn.loading ? <Loading isBtnLoading/> : "Create new match"}
          </button>
        </form>
      </div>
    </div>
  );
}
