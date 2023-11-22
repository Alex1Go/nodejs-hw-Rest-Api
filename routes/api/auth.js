const express = require("express");
const { register, login, logout, current } = require("../../controllers/auth");
const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, register);
router.post("/login", jsonParser, login);
router.post("/logout", jsonParser, logout);
router.get("/current", jsonParser, current);
module.exports = router;
