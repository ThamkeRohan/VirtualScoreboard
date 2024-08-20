const express = require("express");
const router = express.Router();

const tryCatch = require("../utils/tryCatch");
const { signup, login } = require("../controllers/auth");

router.post("/signup", tryCatch(signup));

router.post("/login", tryCatch(login));

module.exports = router;
