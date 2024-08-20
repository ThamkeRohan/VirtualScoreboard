import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  areSixBallsInPrevOvers,
  areZeroBallsInNextOvers,
  getDeliveryText,
} from "../../utils/scoreboard";
import { useParams } from "react-router-dom";
import {
  useScoreboard,
  useScoreboardUpdate,
} from "../../contexts/ScoreboardContext";

export default function ScoreUpdater({
  currentDelivery,
  setCurrenttDelivery,
  addNewDelivery,
  removePrevDelivery,
  score,
  isSecondInningComplete,
  isFirstInningComplete,
  isLoading
}) {
  
  const { match } = useScoreboard();
  const { team, overId } = useParams();
  

  const currentOverIndex = match[team].oversFaced.findIndex(
    (over) => over._id === overId
  );

  const isRemoveBtnDisabled =
    !areZeroBallsInNextOvers(
      score[team].totalDeliveriesPerOver,
      currentOverIndex
    ) ||
    score[team].totalDeliveriesPerOver[currentOverIndex] <= 0 ||
    (team === "battingFirstTeam" &&
      score.battingSecondTeam.totalDeliveries > 0);

  const isAddBtnDisabled =
    isSecondInningComplete ||
    (team === "battingFirstTeam" && isFirstInningComplete) ||
    (team === "battingSecondTeam" && !isFirstInningComplete) ||
    !areSixBallsInPrevOvers(
      score[team].legalDeliveriesPerOver,
      currentOverIndex
    ) ||
    score[team].legalDeliveriesPerOver[currentOverIndex] === 6;

  
  return (
    <div className="score-updater">
      <div className="controls-container">
        <div className="type">
          <button
            className={`btn control-btn ${
              currentDelivery.type === "legal" ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                type: "legal",
              }))
            }
          >
            Legal
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.type === "no" ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                type: "no",
              }))
            }
          >
            No
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.type === "wide" ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                type: "wide",
              }))
            }
          >
            Wide
          </button>
        </div>

        <div className="wicket">
          <button
            className={`btn control-btn ${
              !currentDelivery.isWicket ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                isWicket: false,
              }))
            }
          >
            Not out
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.isWicket ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                isWicket: true,
              }))
            }
          >
            Out
          </button>
        </div>

        <div className="runs">
          <button
            className={`btn control-btn ${
              currentDelivery.runs === 0 ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                runs: 0,
              }))
            }
          >
            0
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.runs === 1 ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                runs: 1,
              }))
            }
          >
            1
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.runs === 2 ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                runs: 2,
              }))
            }
          >
            2
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.runs === 3 ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                runs: 3,
              }))
            }
          >
            3
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.runs === 4 ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                runs: 4,
              }))
            }
          >
            4
          </button>
          <button
            className={`btn control-btn ${
              currentDelivery.runs === 6 ? "selected" : ""
            }`}
            onClick={() =>
              setCurrenttDelivery((prevCurrentDelivery) => ({
                ...prevCurrentDelivery,
                runs: 6,
              }))
            }
          >
            6
          </button>
        </div>
      </div>
      <div className="actions-container">
        <div className="remove-prev-delivery">
          <button
            className="btn btn-block remove-btn"
            disabled={
              match.matchStatus === "completed" ||
              isLoading ||
              isRemoveBtnDisabled
            }
            onClick={removePrevDelivery}
          >
            Remove previous delivery
          </button>
        </div>
        <div className="add-new-delivery">
          <button
            className="btn btn-block add-btn"
            disabled={
              match.matchStatus === "completed" || isLoading || isAddBtnDisabled
            }
            onClick={addNewDelivery}
          >
            Add {getDeliveryText(currentDelivery)}
          </button>
        </div>
      </div>
    </div>
  );
}
