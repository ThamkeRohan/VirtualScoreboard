import { makeRequest } from "./makeRequest";

export function createNewMatch(matchDetails) {
  return makeRequest(`matches`, {
    method: "POST",
    data: matchDetails,
  });
}

export function getMatch({ matchId }) {
  return makeRequest(`matches/${matchId}`, {
    method: "GET",
  });
}

export function getMatches({ category, fromDate, toDate }) {
  return makeRequest("matches", {
    method: "GET",
    params: {
      category,
      fromDate,
      toDate,
    },
  });
}

export function getActiveMatches() {
  return makeRequest("matches/active", {
    method: "GET"
  })
}

export function getMatchesByUmpire({umpireId}) {
  return makeRequest(`matches/umpires/${umpireId}`, {
    method: "GET"
  })
}

export function editMatchOvers({matchId, action, position, delivery}) {
  return makeRequest(`matches/${matchId}`, {
    method: "PATCH",
    data: {
      action,
      position,
      delivery
    },
  });
}

export function markMatchAsCompleted({matchId}) {
  return makeRequest(`matches/${matchId}/markMatchAsCompleted`, {
    method: "PATCH"
  })
}


