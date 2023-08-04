const express = require("express");

const ctrl = require("../../controllers/auth");
const googleAuth2 = require("../../controllers/google2/googleAuth");
const googleRedirect2 = require("../../controllers/google2/googleRedirect");

const {
  validateBody,
  authenticate,
  gpassport,
  fPassport,
  gitPassport,
  linkedInpassport,
  instagramPassport,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.get(
  "/instagram",
  // fPassport.authenticate("instagram", { scope: ["email", "profile"] })
  instagramPassport.authenticate("instagram", { scope: ["user_profile"] })
  // "instagram"
  // , {
  // scope: ["user_profile"],
  // }

  // scope то что мы хотим получить назад
  // срабатывает googleParams
);

// instagram callback

router.get(
  "/instagram/callback",
  instagramPassport.authenticate("instagram", { session: false }),
  ctrl.githubAuth
  // не делать сессию
  // срабатывает facebookCallback
);

router.get(
  "/linkedin",
  // fPassport.authenticate("linkedin", { scope: ["email", "profile"] })
  linkedInpassport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
  // scope то что мы хотим получить назад
  // срабатывает googleParams
);

// linkedin callback

router.get(
  "/linkedin/callback",
  linkedInpassport.authenticate("linkedin", { session: false }),
  ctrl.githubAuth
  // не делать сессию
  // срабатывает linkedInCallback
);

router.get(
  "/github",
  // fPassport.authenticate("github", { scope: ["email", "profile"] })
  gitPassport.authenticate("github", { scope: ["email", "profile"] })
  // scope то что мы хотим получить назад
  // срабатывает googleParams
);

// github callback

router.get(
  "/github/callback",
  gitPassport.authenticate("github", { session: false }),
  ctrl.githubAuth
  // не делать сессию
  // срабатывает githubCallback
);

router.get(
  "/facebook",
  // fPassport.authenticate("facebook", { scope: ["email", "profile"] })
  fPassport.authenticate("facebook", { scope: ["email"] })
  // scope то что мы хотим получить назад
  // срабатывает facebookParams
);

// facebook callback

router.get(
  "/facebook/callback",
  fPassport.authenticate("facebook", { session: false }),
  ctrl.facebookAuth
  // не делать сессию
  // срабатывает facebookCallback
);

// facebook get
router.get(
  "/google",
  gpassport.authenticate("google", { scope: ["email", "profile"] })
  // scope то что мы хотим получить назад
  // срабатывает googleParams
);

// google callback

router.get(
  "/google/callback",
  gpassport.authenticate("google", { session: false }),
  ctrl.googleAuth
  // не делать сессию
  // срабатывает gooogleCallback
);

// google get v2
router.get("/google2", googleAuth2);

// google callback v2

router.get("/google2/callback", googleRedirect2);

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/refresh", validateBody(schemas.refreshSchema), ctrl.refresh);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

module.exports = router;
