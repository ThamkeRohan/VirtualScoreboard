const jwt = require("jsonwebtoken");
const Umpire = require("../models/umpire");
const Match = require("../models/match");
const createAndPassError = require("../utils/createAndPassError");

const verifyToken = async (token) => {
  if (!token) {
    throw new Error("No Token Provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or Expired Token");
  }

  const umpire = await Umpire.findById(decoded.umpireId).select("-password");

  if (!umpire) {
    throw new Error("Umpire not found");
  }

  return umpire;
};

const authenticateRequest = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    req.umpire = await verifyToken(token);
    next();
  } catch (error) {
    next(createAndPassError(401, error.message, next));
  }
};

const authenticateUmpireSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    socket.umpire = await verifyToken(token);
    
    const match = await Match.findById(socket.handshake.query.matchId);
    if (match.umpireId.toString() !== socket.umpire._id.toString()) {
      throw new Error("Match has different umpire");
    }
    socket.umpire.matchId = socket.handshake.query.matchId;
    next();
  } catch (error) {
    next(new Error("Socket authentication error: " + error.message));
  }
};



module.exports = { authenticateRequest, authenticateUmpireSocket };
