require("dotenv").config();
const User = require("../models/register.model");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    // console.log(payload.id);
    User.findOne({ username: payload.username })
      .then((user) => {
        if (user) {
          if (user.role === payload.role) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        console.log("error=======================", err);
        return done(err, false);
      });
  })
);
