const express = require("express");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { authenticateRequest } = require("../middlewares/auth");

const {
  getMatches,
  getMatch,
  createNewMatch,
  editMatchOvers,
  getMatchesByUmpire,
  markMatchAsCompleted,
} = require("../controllers/match");

router.get("/", tryCatch(getMatches));

router.get("/umpires/:umpireId", tryCatch(getMatchesByUmpire));

router.get("/:matchId", tryCatch(getMatch));

router.post("/", authenticateRequest, tryCatch(createNewMatch));

router.patch("/:matchId", authenticateRequest, tryCatch(editMatchOvers));

router.patch("/:matchId/markMatchAsCompleted", authenticateRequest, tryCatch(markMatchAsCompleted))

module.exports = router;
