const linkedInpassport = require("passport");
const { Strategy } = require("passport-linkedin-oauth2");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, BASE_URL } = process.env;
const linkedinParams = {
  clientID: LINKEDIN_CLIENT_ID,
  clientSecret: LINKEDIN_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/linkedin/callback`,
  profileFields: ["id", "displayName", "email"],
  passReqToCallback: true,
};

const linkedinCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    // const { email, displayName } = profile;
    const { id, firstName, email, profilePicture } = profile._json;

    const linkedInEmail = email || `${id}@linkedin.com`;

    const user = await User.findOne({ email: linkedInEmail });
    console.log(profilePicture);
    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(nanoid(), 10);

    const newUser = await User.create({
      email: linkedInEmail,
      password,
      name: firstName.localized.uk_UA,
    });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const linkedinStrategy = new Strategy(linkedinParams, linkedinCallback);
linkedInpassport.use("linkedin", linkedinStrategy);

module.exports = linkedInpassport;
