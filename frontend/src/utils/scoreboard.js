const BALLS_PER_OVER = 6;

export function getTeamScore(settings, overs) {
  let runs = 0;
  let wickets = 0;
  let legalDeliveries = 0;
  let totalDeliveries = 0;
  let totalDeliveriesPerOver = new Array(overs.length).fill(0);
  let legalDeliveriesPerOver = new Array(overs.length).fill(0);

  overs.forEach((over, overIndex) => {
    totalDeliveriesPerOver[overIndex] = over.deliveries.length;
    over.deliveries.forEach((delivery) => {
      totalDeliveries += 1;
      if (delivery.type === "legal") {
        legalDeliveries += 1;
        legalDeliveriesPerOver[overIndex] += 1;
      } else {
        // Handling no-balls
        if (
          settings.countNoBallOnWicket &&
          delivery.type === "no" &&
          delivery.isWicket
        ) {
          
          legalDeliveries += 1;
          legalDeliveriesPerOver[overIndex] += 1;
        }
        runs += 1; // Extra run for no-balls or wide-balls
      }

      if (delivery.isWicket) {
        wickets += 1;
      }

      runs += delivery.runs; // Adding runs for each delivery
    });
  });

  return {
    runs,
    wickets,
    legalDeliveries,
    totalDeliveries,
    totalDeliveriesPerOver,
    legalDeliveriesPerOver,
  };
}

export function isInningsComplete(
  wicketsLost,
  totalWickets,
  legalDeliveriesBowled,
  totalLegalDeliveries,
  currentScore = null,
  targetScore = null
) {
  if (wicketsLost >= totalWickets) {
    return true;
  }

  if (legalDeliveriesBowled >= totalLegalDeliveries) {
    return true;
  }

  if (targetScore != null && currentScore >= targetScore) {
    return true;
  }

  return false;
}

export function getCurrentRunRate(currentRuns, legalDeliveriesFaced) {
  if (legalDeliveriesFaced === 0) return "";
  const oversFaced = legalDeliveriesFaced / BALLS_PER_OVER;
  const crr = currentRuns / oversFaced;
  return crr.toFixed(2);
}

export function getRequiredRunRate(
  currentRuns,
  targetRuns,
  legalDeliveriesFaced,
  totalLegalDeliveries
) {
  const remainingRuns = targetRuns - currentRuns;
  const remainingBalls = totalLegalDeliveries - legalDeliveriesFaced;
  const remainingOvers = remainingBalls / BALLS_PER_OVER;
  const rrr = remainingRuns / remainingOvers;
  return rrr.toFixed(2);
}

export function getDeliveryText(delivery) {
  let text = "";

  if (delivery.type === "no") {
    text += "NO";
  } else if (delivery.type === "wide") {
    text += "WD";
  }

  if (delivery.isWicket) {
    if (text.length > 0) {
      text += " + ";
    }
    text += "W";
  }

  if (delivery.runs > 0) {
    if (text.length > 0) {
      text += " + ";
    }
    text += `${delivery.runs}`;
  }

  if (text.length === 0) {
    return "0";
  }
  return text;
}

export function areSixBallsInPrevOvers(legalDeliveriesPerOver, overIndex) {
  if (overIndex === 0) return true;

  const prevOversLegalDeliveriesPerOver = legalDeliveriesPerOver.slice(
    0,
    overIndex
  );
  return prevOversLegalDeliveriesPerOver.every(
    (legalDeliveriesForOver) => legalDeliveriesForOver === 6
  );
}

export function areZeroBallsInNextOvers(totalDeliveriesPerOver, overIndex) {
  if (overIndex === totalDeliveriesPerOver.length - 1) return true;

  const nextOversTotalDeliveriesPerOver = totalDeliveriesPerOver.slice(
    overIndex + 1
  );
  return nextOversTotalDeliveriesPerOver.every(
    (totalDeliveriesForOver) => totalDeliveriesForOver === 0
  );
}
