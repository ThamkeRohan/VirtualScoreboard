import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatch } from "../services/match";
import {useAsync} from "../hooks/useAsync"
import ErrorMessage from "../components/Error/ErrorMessage"
import Loading from "../components/Loading";

const ScoreboardContext = React.createContext();
const ScoreboardUpdateContext = React.createContext();

export function useScoreboard() {
  return useContext(ScoreboardContext);
}
export function useScoreboardUpdate() {
  return useContext(ScoreboardUpdateContext);
}
export function ScoreboardProvider({ children }) {
  const { matchId } = useParams();
  const {
    loading,
    error,
    value: matchDetails,
  } = useAsync(() => getMatch({ matchId }), [matchId]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if(matchDetails != null) {
      setMatch(matchDetails.match)
    }
  }, [matchDetails])

  function pushDelivery(newDelivery, position) {
    setMatch((prevMatch) => ({
      ...prevMatch,
      [position.team]: {
        ...prevMatch[position.team],
        oversFaced: prevMatch[position.team].oversFaced.map((currentOver) => {
          if (currentOver._id === position.overId) {
            return {
              ...currentOver,
              deliveries: [...currentOver.deliveries, newDelivery],
            };
          }
          return currentOver;
        }),
      },
    }));
  }
  function popDelivery(position) {
    setMatch((prevMatch) => ({
      ...prevMatch,
      [position.team]: {
        ...prevMatch[position.team],
        oversFaced: prevMatch[position.team].oversFaced.map((currentOver) => {
          if (currentOver._id === position.overId) {
            return {
              ...currentOver,
              deliveries: currentOver.deliveries.slice(
                0,
                currentOver.deliveries.length - 1
              ),
            };
          }
          return currentOver;
        }),
      },
    }));
  }

  if (loading) {
    return <Loading/>;
  }
  if (error) {
    return <ErrorMessage error={error}/>;
  }
  
  if(match == null) {
    return null
  }
  
  
  return (
    <ScoreboardContext.Provider value={{ match, isMatchActive: matchDetails.matchStatus }}>
      <ScoreboardUpdateContext.Provider
        value={{ pushDelivery, popDelivery }}
      >
        {children}
      </ScoreboardUpdateContext.Provider>
    </ScoreboardContext.Provider>
  );
}
