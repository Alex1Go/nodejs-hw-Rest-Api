const express = require("express");
const { uploadAvatar } = require("../../controllers/users");
const upload = require("../../middleware/upload");
const router = express.Router();

const auth = require("../../middleware/midauth");

router.patch("/avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;
