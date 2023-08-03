const passport = require("passport");
const { Strategy } = require("passport-facebook");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, BASE_URL } = process.env;

const facebookParams = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/facebook/callback`,
  profileFields: ["id", "displayName", "email"],
  passReqToCallback: true,
};

const facebookCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    console.log(profile);

    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({ email, password, name: displayName });
    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const facebookStrategy = new Strategy(facebookParams, facebookCallback);
passport.use("facebook", facebookStrategy);

module.exports = passport;
