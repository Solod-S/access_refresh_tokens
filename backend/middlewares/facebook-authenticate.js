const fpassport = require("passport");
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
    // const { email, displayName } = profile;
    const { email, name } = profile._json;
    console.log(profile);

    const user = await User.findOne({ email });
    console.log(`user`, user);
    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      password,
      name: name.split(" ")[1],
    });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const facebookStrategy = new Strategy(facebookParams, facebookCallback);
fpassport.use("facebook", facebookStrategy);

module.exports = fpassport;
