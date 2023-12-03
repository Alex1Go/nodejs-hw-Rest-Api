const fs = require("node:fs/promises");
const path = require("node:path");
const User = require("../models/users");
const Jimp = require("jimp");

async function uploadAvatar(req, res, next) {
  try {
    await fs.rename(
      req.file.path,
      path.join(__dirname, "..", "public/avatars", req.file.filename)
    );

    const image = await Jimp.read(req.file.path);
    image.resize(250, 250);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    ).exec();

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadAvatar };
