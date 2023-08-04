const instagramPassport = require("passport");
const { Strategy } = require("passport-instagram");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET, BASE_URL } = process.env;
const instagramParams = {
  clientID: INSTAGRAM_CLIENT_ID,
  clientSecret: INSTAGRAM_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/instagram/callback`,
  // profileFields: ["id", "displayName", "email"],
  scope: ["user_profile"],
  passReqToCallback: true,
};

const instagramCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(profile);
    // const { email, displayName } = profile;
    const { email, login, id } = profile;
    const instagramEmail = email || `${id}@linkedin.com`;

    const user = await User.findOne({ email: instagramEmail });

    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email: instagramEmail,
      password,
      name: login,
    });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const instagramStrategy = new Strategy(instagramParams, instagramCallback);
instagramPassport.use("instagram", instagramStrategy);

module.exports = instagramPassport;
