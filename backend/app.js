const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoute = require("./routes/auth");
const matchRoute = require("./routes/match");
const connectToMongoDB = require("./connection/connectToMongoDB");
const errorHandler = require("./middlewares/errorHandler");
const setupUmpiresNamespace = require("./socket/namespaces/umpire");
const setupSpectatorsNamespace = require("./socket/namespaces/spectator");

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_BASE_URL, // Update with your client's origin
  methods: ["GET", "POST", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_BASE_URL],
    methods: ["GET", "POST", "PATCH"],
  },
});

const spectatorsNamespace = setupSpectatorsNamespace(io);
setupUmpiresNamespace(io, spectatorsNamespace);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use("/api/auth", authRoute);
app.use("/api/matches", matchRoute);

app.use(errorHandler);

connectToMongoDB()
  .then(() => {
    console.log("Connected to MongoDB...");
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in starting the applicatioin...");
    console.log(err);
  });
