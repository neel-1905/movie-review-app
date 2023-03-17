const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "User Registered", newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//LOGIN

const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user?.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Username or Password is invalid" });
    }

    const token = jwt.sign(
      { id: user?._id, isAdmin: user?.isAdmin },
      "secretkey"
    );

    let { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "User Logged in !", ...otherDetails, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
