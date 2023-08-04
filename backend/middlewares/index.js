const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const gpassport = require("./google-authenticate");
const fPassport = require("./facebook-authenticate");
const gitPassport = require("./github-authenticate");
const linkedInpassport = require("./linkedin-authenticate");
const instagramPassport = require("./instagram-authenticate");
module.exports = {
  validateBody,
  authenticate,
  gpassport,
  fPassport,
  gitPassport,
  linkedInpassport,
  instagramPassport,
};
