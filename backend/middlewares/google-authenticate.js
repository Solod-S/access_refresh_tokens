const gPassport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const gooogleCallback = async (
  req,
  accesssToken,
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
      // передает работу дальше и закрепляет в req.user = user
    }
    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({ email, password, name: displayName });
    return done(null, newUser);
    // передает работу дальше и закрепляет в req.user = newUser
  } catch (error) {
    done(error, false);
    // перекидывает на обработчик ошибок
  }
};

const googleStrategy = new Strategy(googleParams, gooogleCallback);
gPassport.use("google", googleStrategy);

module.exports = gPassport;
