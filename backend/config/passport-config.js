const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user")

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.find({username});
    if (!user) {
      return done(null, false, {message: "Username does not exists"});
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) {
        return done(null, user);
    }
    else {
        return done(null, false, {message: "Invalid password"});
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
