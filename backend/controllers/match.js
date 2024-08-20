const mongoose = require("mongoose");
const Match = require("../models/match");
const { isMatchActive } = require("../socket/activeMatches");
const createAndPassError = require("../utils/createAndPassError");

const getMatches = async (req, res, next) => {
  const { category, fromDate, toDate } = req.query;

  if (category == null || fromDate == null || toDate == null) {
    return createAndPassError(400, "All search parameters are required", next);
  }

  const filter = {
    createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
  };
  if (category !== "all") {
    filter.matchStatus = category;
  }
  const matches = await Match.find(filter)
    .populate("umpireId", "-password")
    .sort({ createdAt: -1 });
  res.status(200).json(matches);
};

const getMatch = async (req, res, next) => {
  const match = await Match.findById(req.params.matchId);
  if (match == null) {
    return createAndPassError(404, "Match not found", next);
  }

  res.status(200).json({
    match,
    isMatchActive: isMatchActive(match._id.toString()),
  });
};

const getMatchesByUmpire = async (req, res, next) => {
  const { umpireId } = req.params;
  const matches = await Match.find({
    umpireId: new mongoose.Types.ObjectId(umpireId),
  })
    .populate("umpireId", "-password")
    .sort({ createdAt: -1 });
  res.status(200).json(matches);
};

const createNewMatch = async (req, res, next) => {
  const {
    totalPlayersPerTeam,
    totalOversPerInning,
    battingFirstTeamName,
    battingSecondTeamName,
  } = req.body;

  console.log(totalPlayersPerTeam, totalOversPerInning,battingFirstTeamName, battingSecondTeamName)
  
  // Create an array of empty overs
  const overs = new Array(totalOversPerInning).fill({ deliveries: [] });

  // Create the match object
  const newMatch = new Match({
    totalPlayersPerTeam,
    totalOversPerInning,
    battingFirstTeam: {
      name: battingFirstTeamName,
      oversFaced: overs,
    },
    battingSecondTeam: {
      name: battingSecondTeamName,
      oversFaced: overs,
    },
    umpireId: req.umpire._id,
  });
  await newMatch.save();
  res.status(201).json(newMatch);
};

const editMatchOvers = async (req, res, next) => {
  const match = await Match.findById(req.params.matchId);
  if (!match) {
    return createAndPassError(404, "Match not found", next);
  }
  if (!match.umpireId.equals(req.umpire._id)) {
    return createAndPassError(
      403,
      "Cannot edit match overs as umpire for the match is different",
      next
    );
  }
  const { action, position, delivery } = req.body;
  if (action === "push") {
    const overIndex = match[position.team].oversFaced.findIndex((over) =>
      over._id.equals(new mongoose.Types.ObjectId(position.overId))
    );
    const length =
      match[position.team].oversFaced[overIndex].deliveries.push(delivery);

    await match.save();
    return res
      .status(200)
      .json(match[position.team].oversFaced[overIndex].deliveries[length - 1]);
  } else if (action === "pop") {
    const overIndex = match[position.team].oversFaced.findIndex((over) =>
      over._id.equals(new mongoose.Types.ObjectId(position.overId))
    );
    const popedDelivery =
      match[position.team].oversFaced[overIndex].deliveries.pop();

    await match.save();
    return res.status(200).json(popedDelivery);
  } else {
    return createAndPassError(400, "Incorrect action", next);
  }
};

const markMatchAsCompleted = async(req, res, next) => {
  const match = await Match.findById(req.params.matchId)
  if(match == null) {
    return createAndPassError(404, "Match not found", next)
  }
  if(!match.umpireId.equals(new mongoose.Types.ObjectId(req.umpire._id))) {
    return createAndPassError(
      403,
      "Cannot edit match overs as umpire for the match is different",
      next
    );
  }

  match.matchStatus = "completed"
  await match.save()
  return res.status(200).json({message: "Match marked as completed"})
}

module.exports = {
  getMatchesByUmpire,
  getMatches,
  getMatch,
  createNewMatch,
  editMatchOvers,
  markMatchAsCompleted
};
