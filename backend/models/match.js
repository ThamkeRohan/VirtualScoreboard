const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["legal", "no", "wide"],
    required: true,
  },
  isWicket: {
    type: Boolean,
    required: true,
  },
  runs: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 6],
    required: true,
  },
});

const overSchema = new mongoose.Schema({
  deliveries: {
    type: [deliverySchema],
    default: [],
  },
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  oversFaced: {
    type: [overSchema],
    default: []
  },
});

const matchSchema = new mongoose.Schema(
  {
    totalPlayersPerTeam: {
      type: Number,
      required: true,
      min: 2,
      max: 11,
    },
    totalOversPerInning: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    battingFirstTeam: {
      type: teamSchema,
      required: true,
    },
    battingSecondTeam: {
      type: teamSchema,
      required: true,
    },
    matchStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
    umpireId: {
      type: mongoose.Types.ObjectId,
      ref: "Umpire",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
