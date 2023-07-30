const express = require("express");

const ctrl = require("../../controllers/auth");
const googleAuth2 = require("../../controllers/google2/googleAuth");
const googleRedirect2 = require("../../controllers/google2/googleRedirect");

const { validateBody, authenticate, passport } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// google get
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
  // scope то что мы хотим получить назад
  // срабатывает googleParams
);

// google callback

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
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
