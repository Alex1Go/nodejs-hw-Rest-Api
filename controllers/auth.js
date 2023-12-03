const User = require("../models/users");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { userSchema } = require("../validation/userValidationSchema");
const { sendEmail } = require("../helpers/sendEmail");

async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = crypto.randomUUID();
    await sendEmail({
      to: email,
      subject: "Welcome to Contacts book",
      html: `To confirm your registration, please click on <a href="http://localhost:3000/users/verify/${verificationToken}">link</a>`,
      text: `To confirm your registration, please open the link  http://localhost:3000/users/verify/${verificationToken}`,
    });
    const newUser = await User.create({
      email,
      verificationToken,
      password: passwordHash,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const user = await User.findOne({ email }).exec();
    if (user === null) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    if (user.verify !== true) {
      return res.status(401).send({ message: "Your account is not verified" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      token: null,
    }).exec();
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}

async function verify(req, res, next) {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken }).exec();

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, current, verify };
