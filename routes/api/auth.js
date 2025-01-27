const express = require("express");
const {
  register,
  login,
  logout,
  current,
  verify,
  resendVerifyEmail,
} = require("../../controllers/auth");
const router = express.Router();
const jsonParser = express.json();
const auth = require("../../middleware/midauth");

router.post("/register", jsonParser, register);
router.post("/login", jsonParser, login);
router.post("/logout", auth, logout);
router.get("/current", auth, current);
router.get("/verify/:verificationToken", verify);
router.post("/verify", resendVerifyEmail);

module.exports = router;
