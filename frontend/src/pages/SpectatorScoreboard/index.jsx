import React, { useEffect } from 'react'
import useListenScoreboardChanges from '../../hooks/useListenScoreboardChanges';
import useSpectatorSocket from './useSpectatorSocket';
import { useScoreboard } from '../../contexts/ScoreboardContext';
import MatchScore from '../../components/Scoreboard/MatchScore';
import RunRateTracker from '../../components/Scoreboard/RunRateTracker';
import ScoreboardNavigation from '../../components/Scoreboard/ScoreboardNavigation';
import OverDetail from '../../components/Scoreboard/OverDetail';


export default function SpectatorScoreboard() {
  const { match } = useScoreboard();
  const { score, isFirstInningComplete, isSecongInningComplete } =
    useListenScoreboardChanges(match);
  useSpectatorSocket(); 
  

  return (
    <div className='container-md scoreboard'>
      <MatchScore score={score} />
      <RunRateTracker
        score={score}
        isFirtInningComplete={isFirstInningComplete}
        isSecondInningComplete={isSecongInningComplete}
      />
      <ScoreboardNavigation scoreboardType="spectator-scoreboard" />
      <OverDetail />
    </div>
  );
}
