const activeMatches = new Map(); // { matchId: { umpireId, spectatorSocketIds: [] } }

const isMatchActive = (matchId) => {
  return activeMatches.has(matchId);
};

const addActiveMatch = (matchId, umpireId) => {
  activeMatches.set(matchId, { umpireId, spectatorSocketIds: [] });
  
};

const removeActiveMatch = (matchId) => {
  activeMatches.delete(matchId);
  
};

const getMatchSpectators = (matchId) => {
  const match = activeMatches.get(matchId);
  return match ? match.spectatorSocketIds : [];
};

const addMatchSpectator = (matchId, spectatorSocketId) => {
  const match = activeMatches.get(matchId);
  match.spectatorSocketIds.push(spectatorSocketId);
  activeMatches.set(matchId, match);
  
};

const removeMatchSpectator = (matchId, spectatorSocketId) => {
  const match = activeMatches.get(matchId);
  if (match) {
    match.spectatorSocketIds = match.spectatorSocketIds.filter(
      (id) => id !== spectatorSocketId
    );
    activeMatches.set(matchId, match);
  }
  
};

const isUmpireActiveForGivenMatch = (umpireId, matchId) => {
  const match = activeMatches.get(matchId);
  return match?.umpireId === umpireId;
};

module.exports = {
  isMatchActive,
  addActiveMatch,
  removeActiveMatch,
  addMatchSpectator,
  getMatchSpectators,
  removeMatchSpectator,
  isUmpireActiveForGivenMatch,
};
