const { User } = require("../models/user");
const gravatar = require("gravatar");
const HttpError = require("../utils/HttpError");
const bcryptjs = require("bcryptjs");
const cntrlErrorDecorator = require("../utils/cntrlErrorDecorator");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const avatarsDir = path.join(process.cwd(), "public", "avatars");
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  const hashPass = await bcryptjs.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    avatarURL: gravatar.url(email),
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcryptjs.compare(password, user.password)))
    throw HttpError(401, "Email or password is wrong");

  const token = jwt.sign({ id: user._id }, process.env.S_KEY, {
    expiresIn: "1h",
  });
  await user.updateOne({ token });
  res.json({ token, user: { email, subscription: user.subscription } });
};
const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204).send();
};
const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};
const updateSubscription = async (req, res) => {
  await req.user.updateOne(req.body);
  res.json({
    user: await User.findById(req.user._id, "email subscription -_id"),
  });
};
const updateAvatar = async (req, res) => {
  const filename = `${req.user._id}_${req.file.filename}`;
  await (await Jimp.read(req.file.path))
    .resize(250, 250)
    .writeAsync(path.join(avatarsDir, filename));
  await fs.unlink(req.file.path);
  const avatarURL = path.join("avatars", filename);
  await req.user.updateOne({ avatarURL });
  if (req.user.avatarURL.startsWith("avatars/"))
    await fs.unlink(path.join(process.cwd(), "public", req.user.avatarURL));  
  res.json({ avatarURL });
};
module.exports = {
  register: cntrlErrorDecorator(register),
  login: cntrlErrorDecorator(login),
  logout: cntrlErrorDecorator(logout),
  current: cntrlErrorDecorator(current),
  updateSubscription: cntrlErrorDecorator(updateSubscription),
  updateAvatar: cntrlErrorDecorator(updateAvatar),
};
