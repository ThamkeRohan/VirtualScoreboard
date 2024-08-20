import React, { useEffect, useState } from "react";
import MatchScore from "../../components/Scoreboard/MatchScore";
import useListenScoreboardChanges from "../../hooks/useListenScoreboardChanges";
import RunRateTracker from "../../components/Scoreboard/RunRateTracker";
import ScoreboardNavigation from "../../components/Scoreboard/ScoreboardNavigation";
import OverDetail from "../../components/Scoreboard/OverDetail";
import ScoreUpdater from "../../components/Scoreboard/ScoreUpdater";
import { useScoreboard, useScoreboardUpdate } from "../../contexts/ScoreboardContext";
import useUmpireSocket from "./useUmpireSocket";
import { useAsyncFn } from "../../hooks/useAsync";
import { editMatchOvers } from "../../services/match";
import { useParams } from "react-router-dom";
import MarkMatchAsComplete from "./MarkMatchAsComplete";

export default function UmpireScoreboard() {
  const [currentDelivery, setCurrenttDelivery] = useState({
    type: "legal",
    isWicket: false,
    runs: 0,
  });
  const { matchId, team, overId } = useParams();
  const { match } = useScoreboard();
  const { score, isFirstInningComplete, isSecongInningComplete } =
    useListenScoreboardChanges(match);
  const { sendUpdateToSpectators, disconnectSocketOnError } = useUmpireSocket();
  const editMatchOversFn = useAsyncFn(editMatchOvers);
  const { pushDelivery: pushDeliveryLocally, popDelivery: popDeliveryLocally } =
    useScoreboardUpdate();

  
  function addNewDelivery() {
    editMatchOversFn.execute({
      matchId,
      action: "push",
      position: { team, overId },
      delivery: currentDelivery,
    })
      .then((savedDelivery) => {
        pushDeliveryLocally(savedDelivery, { team, overId });
        setCurrenttDelivery({
          type: "legal",
          isWicket: false,
          runs: 0,
        });

        sendUpdateToSpectators({
          action: "push",
          position: { team, overId },
          delivery: currentDelivery,
        });
      })
      .catch((err) => {
        console.log(err);
        disconnectSocketOnError(err);
      });
  }

  function removePrevDelivery() {
    editMatchOversFn.execute({
      matchId,
      action: "pop",
      position: { team, overId },
    })
      .then(() => {
        popDeliveryLocally({
          team,
          overId,
        });

        sendUpdateToSpectators({
          action: "pop",
          position: { team, overId },
        });
      })
      .catch((err) => {
        console.log(err);
        disconnectSocketOnError(err);
      });

  }

  return (
    <div className="container-md scoreboard">
      <MatchScore score={score} />
      <RunRateTracker
        score={score}
        isFirtInningComplete={isFirstInningComplete}
        isSecondInningComplete={isSecongInningComplete}
      />
      <ScoreboardNavigation scoreboardType="umpire-scoreboard" />
      <OverDetail />
      <ScoreUpdater
        currentDelivery={currentDelivery}
        setCurrenttDelivery={setCurrenttDelivery}
        addNewDelivery={addNewDelivery}
        removePrevDelivery={removePrevDelivery}
        score={score}
        isFirstInningComplete={isFirstInningComplete}
        isSecondInningComplete={isSecongInningComplete}
        isLoading={editMatchOversFn.loading}
      />
      {match.matchStatus === "pending" && isSecongInningComplete && (
        <MarkMatchAsComplete disconnectSocketOnError={disconnectSocketOnError}/>
      )}
    </div>
  );
}
