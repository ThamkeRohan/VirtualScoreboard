const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Umpire = require("../models/umpire.js");
const createAndPassError = require("../utils/createAndPassError.js");

const signup = async (req, res, next) => {
  const { umpireName, profilePicUrl, password } = req.body;
  if (
    umpireName.trim().length === 0 ||
    profilePicUrl.trim().length === 0 ||
    password.trim().length === 0
  ) {
    return createAndPassError(400, "All fields are required", next);
  }
  const existingUmpire = await Umpire.findOne({ umpireName });
  if (existingUmpire != null) {
    return createAndPassError(400, "Umpire name already exists", next);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUmpire = new Umpire({
    umpireName,
    password: hashedPassword,
    profilePicUrl
  });
  await newUmpire.save();
  generateTokenAndSendResponse(newUmpire, res);
};

const login = async (req, res, next) => {
  const { umpireName, password } = req.body;
  
  if (umpireName.trim().length === 0 || password.trim().length === 0) {
    return createAndPassError(400, "All fields are required", next);
  }
  const umpire = await Umpire.findOne({ umpireName });
  if (umpire == null) {
    return createAndPassError(400, "Umpire name does not exists", next);
  }
  const isPasswordCorrect = await bcrypt.compare(password, umpire.password);

  if (!isPasswordCorrect) {
    return createAndPassError(400, "Incorrect password", next);
  }

  generateTokenAndSendResponse(umpire, res);
};

const generateTokenAndSendResponse = (umpire, res) => {
  const token = jwt.sign({ umpireId: umpire._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    umpire: {
      _id: umpire._id,
      umpireName: umpire.umpireName,
      profilePicUrl: umpire.profilePicUrl,
    },
    token,
  });
};

module.exports = { signup, login };
