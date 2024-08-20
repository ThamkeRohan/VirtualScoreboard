const { authenticateUmpireSocket } = require("../../middlewares/auth");
const {
  addActiveMatch,
  removeActiveMatch,
  getMatchSpectators,
} = require("../activeMatches");

const broadcastUpdateToMatchSpectators = (
  update,
  matchId,
  spectatorsNamespace
) => {
  const matchSpectators = getMatchSpectators(matchId);
  matchSpectators.forEach((spectator) =>
    spectatorsNamespace.to(spectator).emit("overs-updated", update)
  );
};
const broadcastUmpireDisconnectedEventToMatchSpectators = (
  matchId,
  spectatorsNamespace
) => {
  const matchSpectators = getMatchSpectators(matchId);
  matchSpectators.forEach((spectator) =>
    spectatorsNamespace
      .to(spectator)
      .emit("umpire-disconnected", "Umpire disconnected")
  );
};

const setupUmpiresNamespace = (io, spectatorsNamespace) => {
  const umpiresNamespace = io.of("/umpire");
  umpiresNamespace.use(authenticateUmpireSocket);
  umpiresNamespace.on("connection", (socket) => {
    console.log("Umpire connected to socket", socket.umpire);
    addActiveMatch(socket.umpire.matchId, socket.umpire._id.toString());

    socket.on("overs-updated", (update) => {
      broadcastUpdateToMatchSpectators(
        update,
        socket.umpire.matchId,
        spectatorsNamespace
      );
    });

    socket.on("disconnect", () => {
      broadcastUmpireDisconnectedEventToMatchSpectators(
        socket.umpire.matchId,
        spectatorsNamespace
      );
      removeActiveMatch(socket.umpire.matchId);
      
    });
  });
};

module.exports = setupUmpiresNamespace;
