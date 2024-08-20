const mongoose = require("mongoose");

const umpireSchema = new mongoose.Schema(
  {
    umpireName: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicUrl: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Umpire", umpireSchema);
