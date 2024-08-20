// namespaces/spectators.js
const {
  isMatchActive,
  addMatchSpectator,
  removeMatchSpectator,
} = require("../activeMatches");

const ensureMatchIsActive = (socket, next) => {
  if (!isMatchActive(socket.handshake.query.matchId)) {
    return next(new Error("Match is not active"));
  }
  next();
};

const setupSpectatorsNamespace = (io) => {
  const spectatorsNamespace = io.of("/spectator");
  spectatorsNamespace.use(ensureMatchIsActive);
  spectatorsNamespace.on("connection", (socket) => {
    console.log("Spectator connected to socket", socket.id);
    addMatchSpectator(socket.handshake.query.matchId, socket.id);

    socket.on("disconnect", () => {
      console.log("Spectator disconnected", socket.id);
      removeMatchSpectator(socket.handshake.query.matchId, socket.id);
    });
  });

  return spectatorsNamespace;
};

module.exports = setupSpectatorsNamespace;
