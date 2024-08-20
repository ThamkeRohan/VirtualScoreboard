// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");

// const { authenticateUmpireSocket } = require("../middlewares/auth");
// const Match = require("../models/match");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PATCH"],
//   },
// });

// const activeMatches = new Map(); // { umpireId: { matchId, spectatorSocketIds: [] } }

// const umpiresNamespace = io.of("/umpires");
// umpiresNamespace.use(authenticateUmpireSocket);
// umpiresNamespace.on("connection", (socket) => {
//   console.log("Umpire connected to socket", socket.umpire);
//   addActiveMatch(socket.umpire.matchId, socket.umpire.umpireId);

//   socket.on("overs-updated", (update) => {
//     updateMatchOvers(update, socket);
//   });

//   socket.on("disconnect", () => {
//     removeActiveMatch(socket.umpire.matchId);
//     const matchSpectators = getMatchSpectators(socket.umpire.matchId);
//     matchSpectators.forEach((spectator) =>
//       spectatorsNamespace
//         .to(spectator)
//         .emit("umpire-disconnected", "Umpire disconnected")
//     );
//   });
// });

// const spectatorsNamespace = io.of("spectators");
// spectatorsNamespace.use(ensureMatchIsActive);
// spectatorsNamespace.on("connection", (socket) => {
//   console.log("Spectator connected to socket", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Spectator disconnected", socket.id);
//     removeMatchSpectator(socket.handshake.query.matchId, socket.id);
//   });
// });

// const ensureMatchIsActive = (socket, next) => {
//   const isMatchActive = activeMatches.has(
//     socket.handshake.query.matchId.toString()
//   );
//   if (!isMatchActive) {
//     return next(new Error("Match is not active"));
//   }
//   next();
// };

// const isUmpireActiveForGivenMatch = (umpireId, matchId) => {
//   return (
//     activeMatches.get(matchId.toString())?.umpireId ===
//     umpireId.toString()
//   );
// };

// const addActiveMatch = (matchId, umpireId) => {
//   activeMatches.set(matchId.toString(), {
//     umpireId: umpireId.toString(),
//     spectatorSocketIds: [],
//   });
// };

// const removeActiveMatch = (matchId) => {
//   activeMatches.delete(matchId.toString());
// };

// const getMatchSpectators = (matchId) => {
//   activeMatches.get(matchId.toString()).spectatorSocketIds;
// };

// const removeMatchSpectator = (matchId, spectatorSocketId) => {
//   const matchEntry = activeMatches.get(matchId.toString());
//   const updatedMatchEntry = {
//     ...matchEntry,
//     spectatorSocketIds: matchEntry.spectatorSocketIds.filter(
//       (socketId) => socketId !== spectatorSocketId.toString()
//     ),
//   };
//   activeMatches.set(matchId.toString(), updatedMatchEntry);
// };

// const updateMatchOvers = async (update, socket) => {
//   try {
//     const match = await Match.findById(socket.umpire.matchId);
//     if (!match) {
//       return socket.emit("overs-update-error", "Match not found");
//     }

//     const { type, position, delivery } = update;
//     if (type === "insert") {
//       match[position.team].oversFaced[position.over][position.delivery] =
//         delivery;
//     } else if (type === "remove") {
//       match[position.team].oversFaced[position.over].splice(
//         position.delivery,
//         1
//       );
//     } else {
//       return socket.emit("overs-update-error", "Incorrect update type");
//     }

//     await match.save();
//     // Send update to all spectators of the match
//     const matchSpectators = getMatchSpectators(socket.umpire.matchId);
//     matchSpectators.forEach((spectator) =>
//       spectatorsNamespace.to(spectator).emit("overs-updated", update)
//     );
//   } catch (error) {
//     console.log("Error updating match overs:", error);
//     socket.emit("overs-update-error", "Internal server error");
//   }
// };

// module.exports = { app, server, isUmpireActiveForGivenMatch };
