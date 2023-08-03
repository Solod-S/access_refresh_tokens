const passport = require("passport");
const { Strategy } = require("passport-github2");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, BASE_URL } = process.env;
const githubParams = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/github/callback`,
  profileFields: ["id", "displayName", "email"],
  passReqToCallback: true,
};

const githubCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(`CURRENT`);
    // const { email, displayName } = profile;
    const { email, login, id } = profile._json;
    const githubEmail = email || `${id}@linkedin.com`;

    const user = await User.findOne({ email: githubEmail });

    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email: githubEmail,
      password,
      name: login,
    });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const githubStrategy = new Strategy(githubParams, githubCallback);
passport.use("github", githubStrategy);

module.exports = passport;
