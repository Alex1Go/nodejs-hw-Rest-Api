const User = require("../models/users");
const bcrypt = require("bcrypt");
const { userSchema } = require("../validation/userValidationSchema");

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

    const newUser = await User.create({ email, password: passwordHash });
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
    res.status(200).json({
      token: "exampletoken",
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {}
async function current(req, res, next) {}
module.exports = { register, login, logout, current };
